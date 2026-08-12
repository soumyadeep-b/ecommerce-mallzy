const brevo = require('@getbrevo/brevo');
console.log('BREVO EXPORTS:', Object.keys(brevo));

const sendEmail = async ({ email, subject, message }) => {
  console.log('sendEmail called - debug mode, not sending yet');
};

module.exports = sendEmail;