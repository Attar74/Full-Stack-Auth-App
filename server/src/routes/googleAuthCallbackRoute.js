import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth';

export const googleAuthCallbackRoute = {
  path: '/auth/google/callback',
  method: 'GET',
  handler: async (req, res) => {
    const { code } = req.query;
    const oauthUserInfo = await getGoogleUser({ code });
    const user = await updateOrCreateUserFromOauth({ oauthUserInfo });
    const { _id, email, username, isVerified, phoneNumber } = user;
    jwt.sign(
      { _id, email, username, isVerified, phoneNumber },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Error signing token' });
        }
        //res.cookie('token', token, { httpOnly: true });
        res.redirect(`http://localhost:3000/login?token=${token}`);
      }
    );
  },
};
