"use client";

import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as s from "./login.style";

const schema = yup.object({
  userNum: yup.number().required("사원 번호를 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

export default function Login() {
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
    <s.LoginForm onSubmit={handleSubmit(onClickLogin)}>
      <s.LoginInput
        type="text"
        placeholder="사원번호"
        {...register("userNum")}
      />
      <s.LoginInput
        type="text"
        placeholder="비밀번호"
        {...register("password")}
      />
      <s.LoginButton>로그인</s.LoginButton>
    </s.LoginForm>
  );
}
