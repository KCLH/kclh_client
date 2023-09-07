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

  const { register, handleSubmit, formState } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSignUp = async (data: FormValue) => {
    try {
      await axios.post(createUserEndpoint, data);
      router.push("/factory/1");
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
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert onClose={() => setOpenErrorSnackbar(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>

      <SignUpUI
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        onClickSignUp={onClickSignUp}
      />
    </>
  );
}
