import { baseEmailTemplate } from './baseTemplate.js';

export const welcomeTemplate = (name: string, loginUrl: string): string => {
    const content = `
    <h2 style="margin-top: 0;">Welcome to Thatlytics! 🚀</h2>
    <p>Hi ${name},</p>
    <p>We're thrilled to have you on board! Your account has been successfully verified.</p>
    <p>Thatlytics provides you with powerful insights and tracking tools to take your projects to the next level. You can now securely log in to your dashboard and start exploring.</p>
    <div style="text-align: center;">
      <a href="${loginUrl}" class="btn">Go to Dashboard</a>
    </div>
    <p>If you need any help or have questions, feel free to reach out to our support team.</p>
  `;

    return baseEmailTemplate(content, 'Welcome to Thatlytics!');
};
