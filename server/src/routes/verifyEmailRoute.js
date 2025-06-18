import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
  path: '/api/verify-email',
  method: 'PUT',
  handler: async (req, res) => {
    const { verificationCode } = req.body;

    const db = getDbConnection('react-auth-db');
    const user = await db.collection('users').findOne({ verificationCode });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        description:
          'If you have not verified your email, please try again. If the problem persists, please contact support.',
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: 'User already verified',
        description: 'If you have already verified your email, please login.',
      });
    }

    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { isVerified: true } }
      );

    jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        isVerified: true,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error signing token' });
        }
        return res.status(200).json({ token });
      }
    );
  },
};
