import { useEffect, useState } from 'react';

interface FetchResult {
  data: any;
  isLoading: boolean;
  error: Error | null;
}

const useFetch = (url: string): FetchResult => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error as Error | null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
