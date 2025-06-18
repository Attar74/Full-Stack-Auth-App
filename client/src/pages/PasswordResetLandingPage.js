import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PasswordResetFail } from './PasswordResetFail';
import { PasswordResetSuccess } from './PasswordResetSuccess';

export const PasswordResetLandingPage = () => {
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { passwordResetCode } = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(
        `http://localhost:8080/api/users/${passwordResetCode}/reset-password`,
        {
          newPassword: passwordValue,
        }
      );
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setIsFailure(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFailure) {
    return <PasswordResetFail />;
  }

  if (isSuccess) {
    return <PasswordResetSuccess />;
  }

  return (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>Password Reset</h1>
      <p>Please enter your new password below.</p>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          disabled={
            isLoading ||
            !passwordValue ||
            !confirmPasswordValue ||
            passwordValue !== confirmPasswordValue
          }
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
