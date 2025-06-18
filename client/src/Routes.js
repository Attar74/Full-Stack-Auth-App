import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoutes } from './auth/PrivateRoutes';
import { EmailVerification } from './pages/EmailVerification';
import { ForgetPasswordPage } from './pages/ForgetPasswordPage';
import { LoginPage } from './pages/LoginPage';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage';
import { SignupPage } from './pages/SignupPage';
import { UserInfoPage } from './pages/UserInfoPage';
import { VerificationPage } from './pages/VerificationPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <UserInfoPage />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/please-verify-email" element={<VerificationPage />} />
        <Route
          path="/verify-email/:verificationCode"
          element={<EmailVerification />}
        />
        <Route
          path="/reset-password/:passwordResetCode"
          element={<PasswordResetLandingPage />}
        />
      </Routes>
    </Router>
  );
};
