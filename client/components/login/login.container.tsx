"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LoginUI from "@/components/login/login.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValue, schema } from "../hooks/Login";

export default function LoginContainer() {
  const cookies = new Cookies();
  const loginEndpoint = `${process.env.NEXT_PUBLIC_SERVER}/employee/login`;
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickLogin = async (data: FormValue) => {
    try {
      // withCredentials 옵션을 true로 설정하여 요청 시 쿠키를 함께 보냄
      const response = await axios.post(loginEndpoint, data, {
        withCredentials: true,
      });

      // // 응답에서 토큰 추출 후 쿠키에 저장
      // document.cookie = `jwt=${response.data.token}; path=/;`;

      // universal-cookie의 set 함수를 사용하여 쿠키에 토큰 저장
      cookies.set("jwt", response.data.token);

      router.push("/factory/1");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        // or show error message to user
      }
    }
  };

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onClickLogin={onClickLogin}
    />
  );
}
