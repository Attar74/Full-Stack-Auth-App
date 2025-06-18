import { useNavigate } from 'react-router-dom';

export const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1 style={{ color: 'green' }}>Email Verification Success</h1>
      <p>
        Thank you for verifying your email. You can now login to your account
      </p>
      <button onClick={() => navigate('/')}>Go to User Info</button>
    </div>
  );
};
