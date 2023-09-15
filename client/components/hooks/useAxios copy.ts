import { useState, useEffect } from "react"; // React의 Hook 기능인 useState와 useEffect를 가져오기.
import axios, { Method } from "axios"; // axios 라이브러리와 그 안의 Method 타입을 가져오기.

// FetchState라는 인터페이스(데이터 형태)를 정의. 이것은 우리가 데이터를 요청할 때 그 상태를 나타내는 객체.
interface FetchState<T> {
  loading: boolean; // 데이터가 로딩 중인지 아닌지 나타내기.
  data?: T; // 응답받은 데이터. 아직 데이터를 받지 못했다면 이 값은 없을 수 있음.
  error?: any; // 에러 발생시 에러 정보를 담기. 에러가 없다면 이 값은 없을 수 있음.
}

// useAxios라는 함수를 정의. 이 함수는 주어진 URL에서 데이터를 가져오고, 그 결과 상태(FetchState)를 반환.
const useAxios = <T = any>(
  url: string, // API 요청할 URL.
  method: Method = "get", // HTTP 메소드 (get, post 등)입니다. 기본값은 'get'.
  body: any = null // POST나 PUT과 같이 body에 데이터가 필요한 경우 사용. 기본값은 null.
): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({
    loading: true,
    data: undefined,
    error: undefined,
  });
  /* state라는 이름으로 상태 값을 관리하고 setState 함수로 상태 값을 변경할 수 있게 함. 
   초기값으로는 loading만 true로 설정되어 있는 객체로 시작.*/

  useEffect(() => {
    /* useEffect Hook을 사용하여 컴포넌트 마운트(화면에 나타남), 업데이트(재렌더링), 언마운트(화면에서 사라짐) 시점에 실행되도록 함.*/

    const source = axios.CancelToken.source(); // axios에서 제공하는 CancelToken.source() 메소드로 취소 토큰 생성
    const fetchData = async () => {
      /* fetchData 함수 내부에서 비동기 처리(async-await 패턴 사용)로 API 호출을 하게 됨.*/

      try {
        const response = await axios({
          url,
          method,
          data: body,
          cancelToken: source.token,
        });
        setState({ loading: false, data: response.data });
        /* 성공적으로 API 호출이 완료되었다면 로딩 상태 값을 false로 바꾸고 받아온 데이터(response.data)도 함께 저장.*/
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setState({ loading: false, error });
          /* API 호출 중 에러가 발생하면 로딩 상태 값을 false로 바꾸고, 에러 정보도 함께 저장.*/
        }
      }
    };

    fetchData(); // 정의한 fetchData 함수를 실행.

    // 컴포넌트가 언마운트될 때 진행 중인 Axios 요청을 취소하는 cleanup 함수.
    return () => source.cancel("사용자에 의해 작업이 취소되었습니다.");
  }, [url]); // url 값이 변경될 때마다 이 useEffect 내부의 로직이 다시 실행.

  return state; // 현재 상태값을 반환.
};

export default useAxios; // useAxios 함수를 다른 파일에서도 사용할 수 있게 export 함.
