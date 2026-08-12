const SibApiV3Sdk = require('@getbrevo/brevo');

   const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
   apiInstance.setApiKey(
     SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
     process.env.BREVO_API_KEY
   );

   const sendEmail = async ({ email, subject, message }) => {
     try {
       await apiInstance.sendTransacEmail({
         sender: { name: 'Mallzy', email: 'hisoumyadeepbiswas@gmail.com' },
         to: [{ email }],
         subject,
         htmlContent: message,
       });
       console.log(`Email successfully sent to ${email}`);
     } catch (error) {
       console.error(`Failed to send email to ${email}: ${error.message}`);
     }
   };

   module.exports = sendEmail;