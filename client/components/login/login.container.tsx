"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import LoginUI from "@/components/login/login.presenter";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValue, schema } from "@/components/utils/Login";
import { useCallback, useEffect, useState } from "react";
import useCurrentUser from "@/components/hooks/useCurrentUser";
import { Alert, Snackbar } from "@mui/material";

export default function LoginContainer() {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const onClickLogin = useCallback(
    async (data: FormValue) => {
      try {
        const response = await axios.post(loginEndpoint, data);

        if (response.status === 200) {
          const Token = response.data.token;

          const expires = new Date();
          expires.setDate(expires.getDate() + 1);
          cookies.set("token", Token, { expires });
          cookies.set("employee_num", data.employee_num.toString(), {
            expires,
          });
          cookies.set("name", response.data.name, { expires });
          cookies.set("factory", response.data.factory, { expires });
          cookies.set("role", response.data.role, { expires });
          // cookies.set("role", response.data.admin_ok, { expires });
          // cookies.set("name", response.data.name?.employee_name, { expires });
          // cookies.set("factory", response.data.name?.factory, { expires });
          // cookies.set("role", response.data.name?.admin_ok, { expires });
          // cookies.set("name", response.data.employee_name, { expires });
          // cookies.set("factory", response.data.factory, { expires });
          // cookies.set("role", response.data.admin_ok, { expires });

          axios.defaults.headers.common["token"] = Token;
          axios.defaults.withCredentials = true;

          console.log("response: ", response);
          mutate();
          // router.push("/factory/1");
          router.push("/board/1");
        } else {
          // 에러 메시지 출력
          console.error(error);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);

          setErrorMessage(error.message); // Set error message to state.
          setOpenErrorSnackbar(true); // Open the snackbar.
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
