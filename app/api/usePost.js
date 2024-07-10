import { useState } from 'react';

export const usePost = (url, body) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error);
    }
  };

  return [fetchData, response, error];
};