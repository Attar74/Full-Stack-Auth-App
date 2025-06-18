import { useNavigate } from 'react-router-dom';

export const PasswordResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1 style={{ color: 'green' }}>Password Reset Success</h1>
      <p>
        Thank you for resetting your password. You can now login to your account
      </p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};
