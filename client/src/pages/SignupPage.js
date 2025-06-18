import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import '../styles/auth.css';

export const SignupPage = () => {
  const [token, setToken] = useToken();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const navigate = useNavigate();

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        username,
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      navigate('/please-verify-email');
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>Sign Up</h1>
      <form onSubmit={onSignup}>
        <div className="form-group">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="johnDoe@gmail.com"
          />
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button
          disabled={!email || !password || password !== confirmPassword}
          type="submit"
        >
          Sign Up
        </button>
        <button onClick={() => navigate('/login')} type="button">
          Already have an account? Login
        </button>
      </form>
      {showErrorMessage && (
        <div className="error-message">
          <p>Invalid email or password</p>
        </div>
      )}
    </div>
  );
};
