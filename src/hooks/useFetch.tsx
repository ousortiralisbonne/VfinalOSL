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
        console.error('Sanity fetch error:', error);
        console.error('Query:', query);
        console.error('Params:', params);
        // Améliorer le message d'erreur pour inclure plus d'informations
        const enhancedError = new Error(
          `Request error while attempting to reach is \`${error.message || 'Unknown error'}\`. Query: ${query.substring(0, 100)}...`
        );
        setError(enhancedError);
        setIsLoading(false);
      });
  }, [query, JSON.stringify(params)]);

  return { data, isLoading, error };
};
