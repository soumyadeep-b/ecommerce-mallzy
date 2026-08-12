const { BrevoClient } = require('@getbrevo/brevo');

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

const sendEmail = async ({ email, subject, message }) => {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject: subject,
      htmlContent: message,
      sender: { name: 'Mallzy', email: 'hisoumyadeepbiswas@gmail.com' },
      to: [{ email: email }],
    });
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;