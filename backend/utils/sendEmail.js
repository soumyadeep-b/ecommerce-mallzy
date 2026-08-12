const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, message }) => {
  try {
    await resend.emails.send({
      from: 'Mallzy Support <onboarding@resend.dev>',
      to: email,
      subject: subject,
      html: message,
    });
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;