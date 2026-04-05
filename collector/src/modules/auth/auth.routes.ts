import { Router, type Request, type Response } from "express";
import type { User } from "../../types/User.js";
import { prisma } from '../../config/database/index.js'
import { InternalError } from "../../core/CustomError.js";
import { ApiError } from "../../core/ApiError.js";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import { sendEmail } from "../../services/emailService.js";

const router = Router();

const SECRET_KEY = process.env.JSON_WEB_TOKEN;

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



export default router;