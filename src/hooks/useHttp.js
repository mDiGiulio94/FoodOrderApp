import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Request failed!");
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const sendRequest = useCallback(async () => {
    setLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong");
    }
    setLoading(false);
  }, [url, config]);

  useEffect(() => {
    if ((config &&( config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
