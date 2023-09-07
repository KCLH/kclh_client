"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LoginUI from "@/components/login/login.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValue, schema } from "@/components/utils/Login";
import {
  useCallback,
  useEffect,
  // useState
} from "react";
import useCurrentUser from "@/components/utils/useCurrentUser";

export default function LoginContainer() {
  // const [userNum, setUserNum] = useState("");
  // const [userPW, setUserPW] = useState("");
  const cookies = new Cookies();
  const loginEndpoint = `http://${process.env.NEXT_PUBLIC_SERVER}/employee/login`;
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { userData, error, mutate } = useCurrentUser();

  // const onClickLogin = async (data: FormValue) => {
  //   try {
  //     const response = await axios.post(loginEndpoint, data, {

  //     });

  //     router.push("/factory/1");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error);
  //       // or show error message to user
  //     }
  //   }
  // };

  const onClickLogin = useCallback(
    async (data: FormValue) => {
      try {
        const response = await axios.post(loginEndpoint, data);

        if (response.status === 200) {
          // 서버 응답 처리 및 관련 데이터(토큰 등) 저장
          // cookies.set('token', response.data.token, { expires: 1 });
          const Token = response.data.token;
          // cookies.set('token', Token, { expires: 1 });
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          cookies.set("token", Token, { expires });
          // cookies.set("name", response.data.name, { expires });
          // cookies.set("userid", data.userid.toString(), { expires });
          cookies.set("employee_num", data.employee_num.toString(), {
            expires,
          });

          // axios.defaults.headers.common["token"] = response.data.token;
          axios.defaults.headers.common["token"] = Token;
          axios.defaults.withCredentials = true; // credential:true 추가
          axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"; // access-control-allow-origin 추가
          axios.defaults.headers.common["SameSite"] = "none"; // samesite=none 추가
          axios.defaults.headers.common["secure"] = true; // secure=true 추가
          console.log(response);
          mutate();
          router.push("/factory/1");
        } else {
          // 에러 메시지 출력
          console.error("ID와 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          // or show error message to user
        }
      }
    },
    // [userNum, userPW, mutate]
    [mutate]
  );
  useEffect(() => {
    if (!error && userData) {
      return router.push("/");
    }
  }, []);

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickLogin={onClickLogin}
    />
  );
}
