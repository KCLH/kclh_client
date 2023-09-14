"use client";

import axios from "axios";
import SignUpUI from "@/components/signUp/signUp.presenter";
import { schema, FormValue } from "@/components/utils/SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function SignUpContainer() {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const createUserEndpoint = `${process.env.NEXT_PUBLIC_SERVER}/employee/join`;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSignUp = async (data: FormValue) => {
    console.log("data:", data);
    try {
      await axios.post(createUserEndpoint, data);
      // router.push("/factory/1");
      // router.push("board/1"); // "" 안 맨 앞에 / 안붙이면 현재 위치("admin/signup")와 동등한 위치에서 이동("admin/board/1").
      router.push("/board/1");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);

        setErrorMessage(error.message); // Set error message to state.
        setOpenErrorSnackbar(true); // Open the snackbar.
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
