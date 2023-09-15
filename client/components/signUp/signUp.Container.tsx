"use client";

// import axios from "axios";
import SignUpUI from "@/components/signUp/signUp.presenter";
import { schema, FormValue } from "@/components/utils/SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import { Alert, Snackbar } from "@mui/material";
import { Alert, Snackbar, CircularProgress } from "@mui/material";

// useAxios 훅 import
import useAxios from "@/components/hooks/useAxios";

export default function SignUpContainer() {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const createUserEndpoint = `${process.env.NEXT_PUBLIC_SERVER}/employee/join`;

  // useAxios 훅 사용. 이때 POST 메서드를 사용하기 위해 'post'를 인자로 전달합니다.
  const [
    {
      // data,
      loading,
      // error
    },
    fetchUser,
  ] = useAxios<FormValue>(createUserEndpoint, "post");

  // form hook 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSignUp = (data: FormValue) => {
    console.log("data:", data);
    try {
      // await axios.post(createUserEndpoint, data);
      fetchUser(data); // axios.post 대신 fetchUser 사용
      router.push("accounts"); // "" 안 맨 앞에 / 안붙이면 현재 위치("admin/signup")와 동등한 위치에서 이동("admin/accounts").
      //   if (error) throw error;
      // } catch (error) {
      //   if (error instanceof Error) {
      //     console.error(error);

      //     setErrorMessage(error.message);
      //     setOpenErrorSnackbar(true);
      //   }
    } catch (error) {
      if (error instanceof Error) {
        // error가 Error 객체인지 확인
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
      }
    }
  };

  return (
    <>
      <SignUpUI
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        control={control}
        onClickSignUp={onClickSignUp}
      />

      {/* <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar> */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      {/* 로딩 상태인 경우 CircularProgress 컴포넌트 렌더링 */}
      {loading && <CircularProgress />}
    </>
  );
}
