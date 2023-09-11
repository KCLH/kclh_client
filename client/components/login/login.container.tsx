"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LoginUI from "@/components/login/login.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValue, schema } from "@/components/utils/Login";
import { useCallback, useEffect } from "react";
import useCurrentUser from "@/components/utils/useCurrentUser";

export default function LoginContainer() {
  const cookies = new Cookies();
  const loginEndpoint = `${process.env.NEXT_PUBLIC_SERVER}/employee/login`;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { userData, error, mutate } = useCurrentUser();
  // const { mutate } = useCurrentUser();

  const onClickLogin = useCallback(
    async (data: FormValue) => {
      try {
        const response = await axios.post(loginEndpoint, data);

        if (response.status === 200) {
          // cookies.set('token', response.data.token, { expires: 1 });
          const Token = response.data.token;

          // cookies.set('token', Token, { expires: 1 });
          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          cookies.set("token", Token, { expires });

          cookies.set("employee_num", data.employee_num.toString(), {
            expires,
          });
          cookies.set("name", response.data.name?.employee_name, { expires });
          cookies.set("role", response.data.name?.admin_ok, { expires });
          // cookies.set("name", response.data.employee_name, { expires });
          // cookies.set("role", response.data.admin_ok, { expires });

          // axios.defaults.headers.common["token"] = response.data.token;
          axios.defaults.headers.common["token"] = Token;
          axios.defaults.withCredentials = true;
          // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
          // axios.defaults.headers.common["SameSite"] = "none";
          // axios.defaults.headers.common["secure"] = true;
          console.log("response.data.name: ", response.data.name);
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
    [userData, mutate]
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
      errors={errors}
      onClickLogin={onClickLogin}
    />
  );
}
