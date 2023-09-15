import { useState, useEffect } from "react";

interface FetchState<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

const useFetch = <T = any>(
  url: string,
  method: "get" | "post" | "put" | "delete" = "get",
  body: any = null
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method,
          headers: {
            ...(method === "post" || method === "put"
              ? { "Content-Type": "application/json" }
              : {}),
          },
          ...(method === "post" || method === "put"
            ? { body: JSON.stringify(body) }
            : {}),
        };
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          setState({ loading: false, data });
        } else {
          throw new Error("Error occurred while fetching data");
        }
      } catch (error) {
        setState({ loading: false, error });
      }
    };

    fetchData();
  }, [url]);

  return state;
};

export default useFetch;
