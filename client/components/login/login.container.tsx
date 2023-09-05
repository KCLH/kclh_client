"use client";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginUI from "@/components/login/login.presenter";

const schema = yup.object({
  userNum: yup.number().required("사원 번호를 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

export default function LoginContainer() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickLogin = async () => {
    try {
      router.push("/factory1");
    } catch (e) {
      console.error(e);
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
