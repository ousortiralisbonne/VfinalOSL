import sanityClient from "../sanityClient";
import { useEffect, useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | false;
}

export const useFetch = <T = any>(query: string, params?: Record<string, any>): UseFetchResult<T> => {
  const [error, setError] = useState<Error | false>(false);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    
    sanityClient
      .fetch<T>(query, params || {})
      .then((data: T) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error('Fetch error:', error);
        setError(error);
        setIsLoading(false);
      });
  }, [query, JSON.stringify(params)]);

  return { data, isLoading, error };
};
