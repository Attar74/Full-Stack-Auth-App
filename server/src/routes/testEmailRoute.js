import sendVerificationEmail from '../util/sendEmail';

export const testEmailRoute = {
  path: '/api/test-email',
  method: 'POST',
  handler: async (req, res) => {
    try {
      await sendVerificationEmail({
        to: 'm.elattar.dev+test@gmail.com',
        from: 'm.elattar.dev@gmail.com',
        subject: 'verification Code',
        text: 'You verification code is 123456',
        html: '<p>You verification code is 123456</p>',
      });
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  },
};
