import { baseEmailTemplate } from './baseTemplate.js';

export const verifyEmailTemplate = (name: string, verifyUrl: string): string => {
    const content = `
    <h2 style="margin-top: 0;">Verify your email address</h2>
    <p>Hi ${name},</p>
    <p>Welcome to Thatlytics! To get started and fully activate your account, please verify your email address by clicking the button below:</p>
    <div style="text-align: center;">
      <a href="${verifyUrl}" class="btn">Verify Email</a>
    </div>
    <p>Or copy and paste this link into your browser:</p>
    <p style="word-break: break-all; color: #3f3f46; font-size: 14px;">
      <a href="${verifyUrl}" style="color: #09090b;">${verifyUrl}</a>
    </p>
    <p>This link will expire in 24 hours.</p>
  `;

    return baseEmailTemplate(content, 'Verify your email - Thatlytics');
};
