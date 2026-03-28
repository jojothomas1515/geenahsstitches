import { transporter, defaultMailOptions } from "./nodemailer";

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Utility to send an email using the configured nodemailer transporter.
 */
export const sendMail = async ({ to, subject, html }: SendMailParams) => {
  try {
    const info = await transporter.sendMail({
      ...defaultMailOptions,
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};

/**
 * Generates an HTML Welcome Email template.
 */
export const getWelcomeEmailTemplate = (name: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #111; text-align: center; margin-bottom: 24px;">Welcome to Geenahs Stitches!</h2>
      <p style="color: #444; font-size: 16px; line-height: 1.5;">Hi ${name},</p>
      <p style="color: #444; font-size: 16px; line-height: 1.5;">
        Thank you for joining Geenahs Stitches. We're thrilled to have you here and can't wait for you to explore our latest collections.
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/collections" 
           style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
          Explore Our Collection
        </a>
      </div>
      <p style="color: #444; font-size: 16px; line-height: 1.5;">
        If you have any questions, feel free to reply directly to this email.
      </p>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 32px 0;">
      <p style="color: #888; font-size: 12px; text-align: center;">
        &copy; ${new Date().getFullYear()} Geenahs Stitches. All rights reserved.
      </p>
    </div>
  `;
};

/**
 * Generates an HTML Password Reset Email template.
 */
export const getResetPasswordEmailTemplate = (resetUrl: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #111; text-align: center; margin-bottom: 24px;">Reset Your Password</h2>
      <p style="color: #444; font-size: 16px; line-height: 1.5;">
        We received a request to reset your password. Click the button below to choose a new password:
      </p>
      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" 
           style="background-color: #000; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #666; font-size: 14px; line-height: 1.5;">
        If you didn't request a password reset, you can safely ignore this email. This link will expire shortly.
      </p>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 32px 0;">
      <p style="color: #888; font-size: 12px; text-align: center;">
        &copy; ${new Date().getFullYear()} Geenahs Stitches. All rights reserved.
      </p>
    </div>
  `;
};
