import { useState, useCallback } from "react";
import axios, { Method } from "axios";

// 이 부분은 FetchState라는 TypeScript 인터페이스를 정의하는 부분입니다.
// FetchState는 loading 상태(boolean), 데이터(T 타입), 에러(any 타입)를 포함합니다.
interface FetchState<T> {
  loading: boolean;
  data?: T | null;
  error?: any;
}

// useAxios는 커스텀 훅으로서,
// 주어진 URL과 HTTP 메소드로 요청을 보내고 그 결과를 상태로 관리합니다.
const useAxios = <T = any>(
  url: string,
  method: Method = "get"
): [FetchState<T>, (body?: any) => void] => {
  // 여기서 세 가지 상태(loading, data, error)를 useState 훅을 사용하여 선언하고 초기화합니다.
  const [state, setState] = useState<FetchState<T>>({
    loading: false,
    data: null, // 초기 상태를 null로 설정
    error: null,
  });

  // fetchData 함수는 비동기적으로 API 요청을 수행하며
  // 그 결과에 따라 위에서 선언한 state를 업데이트합니다.
  const fetchData = useCallback(
    async (body?: any) => {
      // 우선 요청이 시작되었으므로 loading 상태를 true로 설정합니다.
      setState({ loading: true });
      try {
        // axios 라이브러리를 사용하여 실제 HTTP 요청을 수행하고 그 결과를 받아옵니다.
        const response = await axios({
          url,
          method,
          data: body,
        });
        console.log("Fetch success", response.data);

        // 요청이 성공적으로 완료되면
        // loading 상태는 false가 되고, data 상태는 응답 데이터로 설정됩니다.
        setState({ loading: false, data: response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Fetch error", error);

          // 만약 요청 중 오류가 발생하면
          // loading 상태는 false가 되고, error 상태는 발생한 오류로 설정됩니다.
          setState({ loading: false, error });
        }
      }
    },
    [url, method]
  );

  return [state, fetchData];
};

export default useAxios;
