import { useNavigate } from 'react-router-dom';

export const EmailVerificationFail = ({ msg, description }) => {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1 style={{ color: 'red' }}>{msg}</h1>
      <p>{description}</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
};
