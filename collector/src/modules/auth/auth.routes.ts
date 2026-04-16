import { Router, type Request, type Response } from "express";
import type { User } from "../../types/User.js";
import { prisma } from '../../config/database/index.js'
import { InternalError } from "../../core/CustomError.js";
import { ApiError } from "../../core/ApiError.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../services/emailService.js";
import { generateSecret, getTOTPSetupDetails, validateTOTP } from "../../services/totpGenerator.js";

const router = Router();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
    throw new Error("JWT Token not found");
}

// signup
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { name, email, password }: User = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // check if email exists 
        const isEmailRegistered = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (isEmailRegistered) return res.status(409).json({
            "error": "email address already in use"
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
            },

        });

        const token = await jwt.sign({
            id: newUser.id,
            email: newUser.email
        }, SECRET_KEY);

        return res.status(201).json({
            message: "account creation successfull",
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
        });

    } catch (error) {
        console.log(error);
        ApiError.handle(new InternalError(), res);
    }

});

// login

router.post('/login', async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // find email

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) return res.status(400).json({
            "message": "email or password is incorrect"
        });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(401).json({
            "message": "email or password is incorrect"
        });

        // If Two-Factor Authentication is enabled, require the TOTP token
        if (user.isTwoFactorEnabled) {
            const { totpToken } = req.body;

            if (!totpToken) {
                // Initial login step requires TOTP
                return res.status(202).json({
                    message: "Two-Factor Authentication required",
                    requires2FA: true,
                    email: user.email // Or ideally, a temporary signed token
                });
            }

            if (!user.twoFactorSecret) {
                return res.status(500).json({ message: "2FA secret missing" });
            }

            const isValid = validateTOTP(user.email, user.twoFactorSecret, totpToken);
            if (!isValid) {
                return res.status(401).json({ message: "Invalid 2FA token" });
            }
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, SECRET_KEY);

        return res.status(200).json({
            message: "login successfull",
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            error: "Internal Server Error"
        });

    }

});

// verify email

router.post('/send-verification-email', async (req: Request, res: Response) => {
    // generate token
    // add rate limiting

    try {
        const { email } = req.body;
        const token = jwt.sign({
            email
        }, SECRET_KEY, {
            expiresIn: '10m'
        });

        await sendEmail(email, token);
        return res.status(200).json({
            message: "verification email sent successfully"
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            error: "Internal Server Error"
        });

    }


});

router.post('/verify-email/:token', async (req: Request, res: Response) => {
    try {
        const token = req.params.token as string;
        if (!token) return res.status(400).json({ error: "verification token not found" });
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        // we can add that user can only be verified if he is logged in

        if (!decoded || !decoded.email) return res.status(401).json({ error: "invalid verification token" });

        // update the db also that the email is verified
        const user = await prisma.user.update({
            where: {
                email: decoded.email
            },
            data: {
                isVerified: true
            }
        });

        return res.status(200).json({
            message: "email verification successfull"
        });
    } catch (error) {
        console.log("email verification error", error)
        ApiError.handle(new InternalError(), res);
    }

});

// forgot password
router.post('/forgot', async (req: Request, res: Response) => {

    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "email is missing" });

        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) return res.status(400).json({ error: "email is not registered" });

        const token = jwt.sign({
            email
        }, SECRET_KEY, { expiresIn: '10m' });

        await sendEmail(email, token)
        return res.status(200).json({ message: "email sent" });
    } catch (error) {
        console.log(error)
        ApiError.handle(new InternalError(), res);
    }

});


router.post('/reset-password/:token', async (req: Request, res: Response) => {
    try {
        const token = req.params.token as string;
        const { password } = req.body;

        if (!token) return res.status(400).json({ error: "token not found" });
        if (!password) return res.status(400).json({ error: "new password is required" });

        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        if (!decoded || !decoded.email) return res.status(401).json({ error: "invalid verification token" });

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                email: decoded.email
            },
            data: {
                passwordHash: hashedPassword
            }
        });

        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log("password reset error", error);
        ApiError.handle(new InternalError(), res);
    }
});

//  2 fator auth


// need to authenticate first and the get the email from the middleware ig
// Generate 2FA Secret for the user
router.post('/2fa/generate', async (req: Request, res: Response) => {
    try {
        // Typically extracting user ID from an authorized session/token
        // Assuming `email` is sent in the body for now, replace with JWT data later
        const { email } = req.body;

        if (!email) return res.status(400).json({ error: "Email is required" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const secret = generateSecret();
        const { uri, secret: base32Secret } = getTOTPSetupDetails(user.email, secret);

        // Store the secret temporally in the database but without enabling 2FA 
        // until the user verifies holding the authenticator device
        await prisma.user.update({
            where: { email },
            data: { twoFactorSecret: base32Secret }
        });

        // The URI is sent back so the frontend can generate a QR Code from it
        return res.status(200).json({ uri, secret: base32Secret });
    } catch (error) {
        console.error("2FA generate error", error);
        ApiError.handle(new InternalError(), res);
    }
});

// Verify 2FA token
router.post('/2fa/verify', async (req: Request, res: Response) => {
    try {
        const { email, token } = req.body;

        if (!email || !token) {
            return res.status(400).json({ error: "Email and token are required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.twoFactorSecret) {
            return res.status(400).json({ error: "User or 2FA secret not found" });
        }

        const isValid = validateTOTP(user.email, user.twoFactorSecret, token);

        if (!isValid) {
            return res.status(401).json({ error: "Invalid 2FA token" });
        }

        // Token is valid, enable 2FA
        await prisma.user.update({
            where: { email },
            data: { isTwoFactorEnabled: true }
        });

        return res.status(200).json({ message: "2FA successfully enabled" });
    } catch (error) {
        console.error("2FA verify error", error);
        ApiError.handle(new InternalError(), res);
    }
});


export default router;