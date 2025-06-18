import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async ({ to, from, subject, text, html }) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };
  try {
    return await sendgrid.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendVerificationEmail;
