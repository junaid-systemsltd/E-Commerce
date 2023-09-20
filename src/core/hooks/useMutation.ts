"use client";

import { useState, useEffect } from "react";

export type mutateFn = (data?: any) => Promise<void>;
export type options = {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
};

export default function useMutation(mutateFn: any, options?: options) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    return () => {
      setData(null);
      setError(null);
      setLoading(false);
    };
  }, []);

  const mutateAsync = async (data?: {}) => {
    setLoading(true);

    try {
      const response = await mutateFn(data);
      setData(response);
      setError(null);

      options?.onSuccess && options.onSuccess(response);
    } catch (err) {
      setError(err);
      setData(null);

      options?.onError && options.onError(err);
    }

    setLoading(false);
  };

  return {
    data,
    isLoading,
    error,
    mutateAsync,
  };
}
