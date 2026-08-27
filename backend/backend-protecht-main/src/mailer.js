const nodemailer = require('nodemailer');

function createTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined
  });
}

async function sendVerificationEmail(email, code) {
  const transporter = createTransporter();
  if (!transporter) {
    console.log(`[verification] ${email}: ${code}`);
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Código de verificação Protecht',
    text: `Seu código de verificação é ${code}. Ele expira em 10 minutos.`
  });
}

module.exports = { sendVerificationEmail };
