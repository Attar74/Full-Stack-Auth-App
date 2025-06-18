import { useState } from 'react';

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const setToken = (newToken) => {
    setTokenInternal(newToken);
    localStorage.setItem('token', newToken);
  };

  return [token, setToken];
};
