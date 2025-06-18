import bcrypt from 'bcrypt';
import { getDbConnection } from '../db';

export const resetPasswordRoute = {
  path: '/api/users/:passwordResetCode/reset-password',
  method: 'PUT',
  handler: async (req, res) => {
    try {
      const { passwordResetCode } = req.params;
      const { newPassword } = req.body;

      const db = getDbConnection('react-auth-db');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const result = await db
        .collection('users')
        .findOneAndUpdate(
          { passwordResetCode },
          { $set: { password: hashedPassword } },
          { $unset: { passwordResetCode: '' } }
        );

      if (result.lastErrorObject.n === 0) {
        return res
          .status(404)
          .json({ message: 'Invalid or expired password reset code' });
      }

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
