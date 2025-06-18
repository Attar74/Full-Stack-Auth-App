import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const loginRoute = {
  path: '/api/login',
  method: 'POST',
  handler: async (req, res) => {
    const { identifier, password } = req.body;
    const db = getDbConnection('react-auth-db');
    const user = await db.collection('users').findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error signing token' });
        }
        res.status(200).json({ token });
      }
    );
  },
};
