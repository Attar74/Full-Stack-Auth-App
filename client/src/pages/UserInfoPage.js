import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { useUser } from '../auth/useUser';

export const UserInfoPage = () => {
  const [token, setToken] = useToken();
  const [user] = useUser();

  const { _id: id, username, phoneNumber, isVerified } = user;

  // We'll use the navigate function to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();

  // These states are bound to the values of the text inputs
  // on the page (see JSX below).
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber);

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          phoneNumber: inputPhoneNumber,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setShowErrorMessage(true);
        return;
      }
      const { token: newToken } = await response.json();
      if (newToken) {
        setToken(newToken);
      }
      setShowSuccessMessage(true);
    } catch (e) {
      console.log(e);
      setShowErrorMessage(true);
    }
  };

  const logOut = () => {
    // We'll want to log the user out here
    // and send them to the "login page"
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetValues = () => {
    // Reset the text input values to
    // their starting values (the data we loaded from the server)
    setInputPhoneNumber(phoneNumber);
  };

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="content-container">
      <h1 style={{ color: 'white' }}>Info for {username}</h1>
      {!isVerified && (
        <p className="fail">Please verify your email address to continue.</p>
      )}
      {showSuccessMessage && (
        <div className="success">Successfully saved user data!</div>
      )}
      {showErrorMessage && (
        <div className="fail">Uh oh... something went wrong</div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveChanges();
        }}
      >
        <div className="form-group">
          <input
            onChange={(e) => setInputPhoneNumber(e.target.value)}
            value={inputPhoneNumber}
            type="text"
            placeholder="Phone Number"
          />
        </div>
        <button disabled={!inputPhoneNumber} type="submit">
          Save Changes
        </button>
        <button type="button" onClick={resetValues}>
          Reset Values
        </button>
        <button type="button" onClick={logOut}>
          Log Out
        </button>
      </form>
    </div>
  );
};
