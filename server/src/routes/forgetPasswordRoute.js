import { v4 as uuidv4 } from 'uuid';
import { getDbConnection } from '../db';
import sendVerificationEmail from '../util/sendEmail';

export const forgetPasswordRoute = {
  path: '/api/forgot-password/:email',
  method: 'PUT',
  handler: async (req, res) => {
    const { email } = req.params;
    console.log(email);
    const db = getDbConnection('react-auth-db');

    const passwordResetCode = uuidv4();

    const { result } = await db
      .collection('users')
      .updateOne({ email }, { $set: { passwordResetCode } });

    if (result.nModified <= 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetLink = `http://localhost:3000/reset-password/${passwordResetCode}`;

    try {
      await sendVerificationEmail({
        to: email,
        from: 'm.elattar.dev@gmail.com',
        subject: 'Password Reset Request',
        text: `Click ${resetLink} to reset your password.`,
        html: `<h1>Password Reset Request</h1>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Reset link sent to email' });
  },
};
