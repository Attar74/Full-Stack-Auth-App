import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import '../styles/auth.css';
import { useQueryParams } from '../util/useQueryParams';

export const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [googleOauthUrl, setGoogleOauthUrl] = useState('');

  const navigate = useNavigate();
  const [, setToken] = useToken();
  const { token: oauthToken } = useQueryParams();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        identifier,
        password,
      });
      const { token } = response.data;
      setToken(token);
      navigate('/');
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate('/');
    }
  }, [navigate, oauthToken, setToken]);

  useEffect(() => {
    const fetchGoogleOauthUrl = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8080/auth/google/url'
        );
        setGoogleOauthUrl(data.url);
      } catch (error) {
        console.log(error);
        setShowErrorMessage(true);
      }
    };
    fetchGoogleOauthUrl();
  }, []);

  const handleGoogleLogin = async () => {
    if (!googleOauthUrl) {
      return;
    }
    try {
      // Redirect to backend Google OAuth endpoint
      window.location.href = googleOauthUrl;
    } catch (error) {
      console.log(error);
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>Login</h1>
      <form onSubmit={onLogin}>
        <div className="form-group">
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            type="text"
            placeholder="Enter your email or username"
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
        <button disabled={!identifier || !password} type="submit">
          Login
        </button>
        <button onClick={() => navigate('/forgot-password')} type="button">
          Forgot Password?
        </button>
        <button onClick={() => navigate('/signup')} type="button">
          Don't have an account? Sign Up
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="google-login-btn"
        type="button"
        disabled={!googleOauthUrl}
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google logo"
          className="google-icon"
        />
        Sign in with Google
      </button>

      {showErrorMessage && (
        <div className="error-message">
          <p>Invalid email or password</p>
        </div>
      )}
    </div>
  );
};
