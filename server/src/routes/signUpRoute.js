import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDbConnection } from '../db';
import sendVerificationEmail from '../util/sendEmail';
export const signUpRoute = {
  path: '/api/signup',
  method: 'POST',
  handler: async (req, res) => {
    const { username, email, password } = req.body;
    const db = getDbConnection('react-auth-db');
    const user = await db.collection('users').findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = uuidv4();

    const defaultInfo = {
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      phoneNumber: '',
      verificationCode,
    };
    const { insertedId } = await db.collection('users').insertOne(defaultInfo);

    try {
      await sendVerificationEmail({
        to: email,
        from: 'm.elattar.dev@gmail.com',
        subject: 'Verification Code',
        text: `Thank you for signing up! To verify your email, click the link below: http://localhost:3000/verify-email//${verificationCode}`,
        html: `<h1>Thank you for signing up! To verify your email, click the link below:</h1> <a href="http://localhost:3000/verify-email/${verificationCode}">Verify Email</a>`,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      res.status(500).json({ message: 'Error sending verification email' });
    }

    jwt.sign(
      { _id: insertedId, email, username, isVerified: false, phoneNumber: '' },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error signing token' });
        }
        res.status(201).json({ token });
      }
    );
  },
};
