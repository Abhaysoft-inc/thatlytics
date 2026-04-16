import * as OTPAuth from "otpauth";

// Generate a new random secret for a user
export const generateSecret = () => {
    return new OTPAuth.Secret({ size: 20 });
};

// Get the TOTP setup details (URI for QR code)
export const getTOTPSetupDetails = (userEmail: string, secret: OTPAuth.Secret | string) => {
    const totp = new OTPAuth.TOTP({
        issuer: "thatlytics",
        label: userEmail,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        // Convert string back to Secret object if necessary
        secret: typeof secret === 'string' ? OTPAuth.Secret.fromBase32(secret) : secret
    });

    return {
        uri: totp.toString(),
        secret: totp.secret.base32 // Store this temporarily until verified, then save to DB
    };
};

// Validate a token provided by the user
export const validateTOTP = (userEmail: string, secret: string, token: string) => {
    const totp = new OTPAuth.TOTP({
        issuer: "thatlytics",
        label: userEmail,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret)
    });

    // Validates the token and returns the step difference, or null if invalid
    const delta = totp.validate({
        token: token,
        window: 1 // allows 1 step (30s) before or after to account for clock drift
    });

    return delta !== null;
};

