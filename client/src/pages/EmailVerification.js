import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToken } from '../auth/useToken';
import { EmailVerificationFail } from './EmailVerficationFail';
import { EmailVerificationSuccess } from './EmailVerficationSuccess';

export const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'verification Failed, Please try again'
  );
  const [errorDescription, setErrorDescription] = useState(
    'Please try again. If the problem persists, please contact support.'
  );
  const [, setToken] = useToken();
  const { verificationCode } = useParams();

  const hasRun = useRef(false); // 🛡️ Prevent duplicate effect in dev

  useEffect(() => {
    if (hasRun.current || !verificationCode) return;
    hasRun.current = true;

    const verifyEmail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.put(
          `http://localhost:8080/api/verify-email`,
          { verificationCode }
        );
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
        setErrorMessage(error?.response?.data?.message || 'Unknown error');
        setErrorDescription(error?.response?.data?.description || '');
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [verificationCode, setToken]);

  if (isLoading) return <div>Loading...</div>;
  if (!isSuccess)
    return (
      <EmailVerificationFail
        msg={errorMessage}
        description={errorDescription}
      />
    );
  return <EmailVerificationSuccess />;
};
