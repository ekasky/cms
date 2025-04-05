import { createEmailService, EmailProvider } from '../../../utils/emailService';
import { EMAIL_DOMAIN, EMAIL_PROVIDER } from '../../../config/config';

const emailService = createEmailService(EMAIL_PROVIDER);

interface SendAccountVerificationEmailOptions {
    to: string;
    verificationLink: string;
}

export const sendAccountVerificationEmail = async ({ to, verificationLink }: SendAccountVerificationEmailOptions) => {
  
    const subject = 'Verify your email address';
    
    const html = `
      <h1>Welcome!</h1>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>If you did not sign up for an account, please ignore this email.</p>
    `;
  
    await emailService.sendEmail({
      to,
      subject,
      html,
      from: `no-reply@${EMAIL_DOMAIN}`,  // customize from address here
    });
  
};