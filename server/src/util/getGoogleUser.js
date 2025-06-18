import axios from 'axios';
import { oauth2Client } from './oauthClient';

const getAccessTokenUrl = (accessToken) =>
  `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`;

export const getGoogleUser = async ({ code }) => {
  const { tokens } = await oauth2Client.getToken(code);
  const { access_token, id_token } = tokens;

  const userInfoResponse = await axios.get(getAccessTokenUrl(access_token), {
    headers: {
      Authorization: `Bearer ${id_token}`,
    },
  });
  return userInfoResponse.data;
};
