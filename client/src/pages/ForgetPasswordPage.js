import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgetPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      await axios.put(
        `http://localhost:8080/api/forgot-password/${emailValue}`
      );
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return isSuccess ? (
    <div className="content-container" style={{ width: '50%' }}>
      <h1 style={{ color: 'white' }}>Password Reset Success</h1>
      <p>
        Please check your email for a link to reset your password. If it doesn't
        appear within a few minutes, check your spam folder.
      </p>
    </div>
  ) : (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>Forget Password</h1>
      <p>Enter your email to reset your password</p>
      {errorMessage && <div className="fail">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <button type="submit" disabled={isLoading || !emailValue}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};
