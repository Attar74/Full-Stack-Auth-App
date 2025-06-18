import { useNavigate } from 'react-router-dom';

export const PasswordResetFail = () => {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1 style={{ color: 'red' }}>Password Reset Failed</h1>
      <p>
        The password reset link is invalid or has expired. Please try again.
      </p>
      <button onClick={() => navigate('/')}>Go to Login</button>
    </div>
  );
};
