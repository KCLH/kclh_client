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

  const onClickLogin = async (data: any) => {
    try {
      router.push("/factory/1");
      console.log("문제가 뭐야");
    } catch (e) {
      console.error(e);
    }
  };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const id = (event.target as any)['filled-required'].value;
  //   const pw = (event.target as any)['filled-password-input'].value;

  //   // TODO: 실제 서버와 통신하는 로직을 여기에 작성하세요.
  //   // 아래는 예시 코드입니다.
  //   try {
  //     const response = await fetch('http://localhost:9999/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ id, pw }),
  //     });

  //     if (!response.ok) throw new Error('Login failed');

  //     const result = await response.json();

  //     // TODO: 서버에서 받은 응답에 따라 페이지 이동 로직을 수정하세요.
  //     router.push(`/factory/${result.id}`);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <LoginUI
      register={register}
      handleSubmit={handleSubmit(onClickLogin)}
      formState={formState}
    />
  );
}
