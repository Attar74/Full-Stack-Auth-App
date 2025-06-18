import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerificationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>verificationPage</h1>
      <p>
        A verification email has been sent to your email address. Please verify
        your email address to continue.
      </p>
    </div>
  );
};
