"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LoginUI from "@/components/login/login.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValue, schema } from "@/components/utils/Login";
import { useCallback, useEffect, useRef, useState } from "react";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import useAxios from "@/components/hooks/useAxios";
import { Alert, Snackbar } from "@mui/material";

export default function LoginContainer() {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [routeToPush, setRouteToPush] = useState("/factory/1");

  const cookies = new Cookies();
  const loginEndpoint = `${process.env.NEXT_PUBLIC_SERVER}/employee/login`;
  const router = useRouter();

  // form data를 저장할 ref 생성
  // const formData = useRef(null);
  const formData = useRef<FormValue | null>(null);

  // useAxios 훅 사용
  const [{ loading, data: response, error: axiosError }, doLogin] = useAxios(
    loginEndpoint,
    "post"
  );

  // console.log("Loading:", loading);
  // console.log("Response:", response);
  // console.log("Error:", axiosError);

  useEffect(() => {
    console.log("타입", typeof response);

    if (!loading) {
      // if (response && response.status === 200) {
      if (response) {
        console.log("Response exists:", response); // 응답 전체 출력
        const Token = response.token;
        console.log("Token:", Token); // Token 값 출력

        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        cookies.set("token", Token, { expires });

        // formData.current가 null이 아니라면 employee_num 값을 쿠키에 저장
        if (formData.current !== null) {
          console.log(
            "employee_num:",
            formData.current.employee_num.toString()
          ); // employee_num 값 출력
          cookies.set(
            "employee_num",
            formData.current.employee_num.toString(),
            { expires }
          );
        }
        // console.log("name:", response.name); // name 값 출력
        // console.log("factory:", response.factory); // factory 값 출력
        // console.log("role:", response.role); // role 값 출력

        cookies.set("name", response.name, { expires });
        cookies.set("factory", response.factory, { expires });
        cookies.set("role", response.role, { expires });
        axios.defaults.headers.common["token"] = Token;
        axios.defaults.withCredentials = true;

        // console.log("response.data: ", response.data);

        const factoryVal = response.factory;
        let routeToPush = "/factory/1";
        console.log("factoryVal", factoryVal);
        console.log("routeToPush", routeToPush);
        if (factoryVal === "파주 2공장") {
          setRouteToPush("/factory/2");
        } else {
          setRouteToPush("/factory/1");
        }

        mutate();
        // console.log("Attempting to navigate to:", routeToPush); // 이 부분 추가
        router.push(routeToPush);
      }

      if (axiosError) {
        console.error(axiosError);

        // axiosError.message를 사용자 친화적인 메시지로 변환
        let userFriendlyErrorMessage;

        switch (axiosError.message) {
          case "Network Error":
            userFriendlyErrorMessage =
              "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
            break;
          case "Request failed with status code 401":
            userFriendlyErrorMessage =
              "아이디 혹은 비밀번호가 일치하지 않습니다.";
            break;
          default:
            userFriendlyErrorMessage =
              "알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.";
        }

        setErrorMessage(userFriendlyErrorMessage);

        setOpenErrorSnackbar(true);
      }
    } else {
      console.log("Response does not exist");
    }
  }, [response, axiosError]); // 의존성 배열에서 loading 제거

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { userData, error, mutate } = useCurrentUser();

  // const onClickLogin = useCallback((data: FormValue) => {
  //   doLogin(data);
  // }, []);
  const onClickLogin = useCallback((data: FormValue) => {
    formData.current = data; // form data 저장
    doLogin(data);
    // console.log(
    //   "🚀 ~ file: login.container.tsx:122 ~ onClickLogin ~ doLogin:",
    //   doLogin
    // );
  }, []);

  // userData나 error 값의 변화에 따라 반응하도록 수정
  useEffect(() => {
    if (!error && userData) {
      return router.push(routeToPush);
    }
  }, [error, userData, routeToPush]);

  return (
    <>
      <LoginUI
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onClickLogin={onClickLogin}
      />
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
