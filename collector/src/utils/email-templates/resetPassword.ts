import { baseEmailTemplate } from './baseTemplate.js';

export const resetPasswordTemplate = (name: string, resetUrl: string): string => {
    const content = `
    <h2 style="margin-top: 0;">Reset your password</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset the password for your Thatlytics account. If you made this request, please click the button below to choose a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </div>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #3f3f46; font-size: 14px;">
      <a href="${resetUrl}" style="color: #09090b;">${resetUrl}</a>
    </p>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
  `;

    return baseEmailTemplate(content, 'Reset your password - Thatlytics');
};
