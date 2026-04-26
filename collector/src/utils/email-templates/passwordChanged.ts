import { baseEmailTemplate } from './baseTemplate.js';

export const passwordChangedTemplate = (name: string): string => {
    const content = `
    <h2 style="margin-top: 0;">Password successfully changed</h2>
    <p>Hi ${name},</p>
    <p>This is a quick confirmation that the password for your Thatlytics account was recently changed.</p>
    <p>If you made this change, you don't need to do anything else.</p>
    <p><strong>Didn't make this change?</strong></p>
    <p>If you didn't change your password, please contact our support team immediately to secure your account.</p>
  `;

    return baseEmailTemplate(content, 'Your password has been changed');
};
