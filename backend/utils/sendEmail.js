const brevo = require('@getbrevo/brevo');

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

const sendEmail = async ({ email, subject, message }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Mallzy', email: 'hisoumyadeepbiswas@gmail.com' };
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = message;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Email successfully sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;