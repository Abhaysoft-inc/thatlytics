import { baseEmailTemplate } from './baseTemplate.js';

export const twoFactorTemplate = (name: string, authCode: string): string => {
    const content = `
    <h2 style="margin-top: 0;">Your authentication code</h2>
    <p>Hi ${name},</p>
    <p>Please use the following code to complete your login securely. This code will expire in 5 minutes.</p>
    <div class="code-block">
      ${authCode}
    </div>
    <p>If you didn't attempt to log in, we highly recommend <a href="#" style="color: #09090b;">changing your password</a> immediately.</p>
  `;

    return baseEmailTemplate(content, 'Your 2FA Code - Thatlytics');
};
