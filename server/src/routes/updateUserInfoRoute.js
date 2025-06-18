import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
  path: '/api/users/:userId',
  method: 'PUT',
  handler: async (req, res) => {
    try {
      const { authorization } = req.headers;
      const { userId } = req.params;
      const { phoneNumber } = req.body;

      if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = authorization.split(' ')[1];

      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });

      const { _id: id, isVerified, googleId } = decoded;

      if (id !== userId) {
        return res
          .status(403)
          .json({ message: 'Not allowed to update this user' });
      }

      if (!googleId && !isVerified) {
        return res.status(403).json({ message: 'User is not verified' });
      }

      const db = getDbConnection('react-auth-db');
      const user = await db
        .collection('users')
        .findOneAndUpdate(
          { _id: new ObjectId(userId) },
          { $set: { phoneNumber, updatedAt: new Date() } },
          { returnOriginal: false }
        );

      if (!user || !user.value) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { _id, ...updatedUserInfo } = user.value;

      // Use promisified JWT sign
      const newToken = await new Promise((resolve, reject) => {
        jwt.sign(
          { _id, ...updatedUserInfo },
          process.env.JWT_SECRET,
          { expiresIn: '24h' },
          (err, token) => {
            if (err) reject(err);
            resolve(token);
          }
        );
      });

      res.status(200).json({
        token: newToken,
        user: updatedUserInfo,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
