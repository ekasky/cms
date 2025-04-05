import { Resend } from 'resend';
import { RESEND_API_KEY } from '../config/config';

export enum EmailProvider {
    RESEND = 'RESEND',
    // Later add: AWS_SES = 'aws_ses', SMTP = 'smtp', etc
}
  
interface SendEmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

// Generic EmailService interface
interface EmailService {
    sendEmail: (options: SendEmailOptions) => Promise<void>;
}


export const createEmailService = (provider: EmailProvider): EmailService => {

    switch (provider) {

      case EmailProvider.RESEND: {
        
        const resend = new Resend(RESEND_API_KEY);
  
        return {

          sendEmail: async ({ to, subject, html, from }) => {

            await resend.emails.send({
              from: from || 'no-reply@yourdomain.com',
              to,
              subject,
              html,
            });

          },

        };
    }
  
      default:
        throw new Error(`Unsupported email provider: ${provider}`);

    }

};