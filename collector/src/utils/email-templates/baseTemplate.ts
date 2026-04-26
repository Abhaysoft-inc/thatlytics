export const baseEmailTemplate = (content: string, title?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title || 'Thatlytics'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f4f4f5;
      color: #18181b;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .header {
      background-color: #09090b;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.025em;
    }
    .content {
      padding: 32px 24px;
    }
    .footer {
      background-color: #fafafa;
      padding: 24px;
      text-align: center;
      font-size: 14px;
      color: #71717a;
      border-top: 1px solid #e4e4e7;
    }
    .btn {
      display: inline-block;
      background-color: #09090b;
      color: #ffffff !important;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
      margin: 24px 0;
    }
    .code-block {
      background-color: #f4f4f5;
      padding: 16px;
      border-radius: 6px;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 4px;
      text-align: center;
      margin: 24px 0;
      color: #09090b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thatlytics</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Thatlytics. All rights reserved.</p>
      <p>If you didn't request this email, you can safely ignore it.</p>
    </div>
  </div>
</body>
</html>
`;
