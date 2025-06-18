import { forgetPasswordRoute } from './forgetPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleAuthCallbackRoute } from './googleAuthCallbackRoute';
import { loginRoute } from './loginRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { testRoute } from './testRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
  testRoute,
  signUpRoute,
  loginRoute,
  updateUserInfoRoute,
  verifyEmailRoute,
  forgetPasswordRoute,
  resetPasswordRoute,
  getGoogleOauthUrlRoute,
  googleAuthCallbackRoute,
];
