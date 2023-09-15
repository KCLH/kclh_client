import { useState, useCallback } from "react";
import axios, { Method } from "axios";

interface FetchState<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

const useAxios = <T = any>(
  url: string,
  method: Method = "get"
): [FetchState<T>, (body?: any) => void] => {
  const [state, setState] = useState<FetchState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  const fetchData = useCallback(
    async (body?: any) => {
      setState({ loading: true });

      try {
        const response = await axios({
          url,
          method,
          data: body,
        });
        setState({ loading: false, data: response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setState({ loading: false, error });
        }
      }
    },
    [url, method]
  );

  return [state, fetchData];
};

export default useAxios;
