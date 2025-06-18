import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  console.log('Received oauthUserInfo:', oauthUserInfo);

  const { sub: googleId, email_verified: isVerified, email } = oauthUserInfo;
  console.log('Extracted values:', { googleId, isVerified, email });

  const db = await getDbConnection('react-auth-db');
  const user = await db.collection('users').findOne({ email });
  console.log('Existing user found:', user);

  if (user) {
    const result = await db
      .collection('users')
      .findOneAndUpdate(
        { email },
        { $set: { googleId, isVerified } },
        { returnOriginal: false }
      );
    console.log('Updated user:', result.value);
    return result.value;
  }

  const newUser = {
    email,
    username: email.split('@')[0],
    googleId,
    isVerified,
    phoneNumber: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  console.log('Creating new user:', newUser);

  const result = await db.collection('users').insertOne(newUser);
  console.log('Insert result:', result);
  return result.ops[0];
};
