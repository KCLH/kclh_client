"use client";

import axios from "axios";
import SignUpUI from "@/components/signUp/signUp.presenter";
import { schema, FormValue } from "@/components/hooks/SignUp";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function SignUpContainer() {
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
        // or show error message to user
      }
    }
  };

  const departments = [
    {
      name: "부서",
      children: [
        { name: "구매" },
        { name: "제조" },
        { name: "생산기술" },
        { name: "생산관리" },
        { name: "품질관리" },
      ],
    },
  ];

  const ranks = [
    {
      name: "직급",
      children: [
        { name: "사원" },
        { name: "주임" },
        { name: "대리" },
        { name: "과장" },
        { name: "차장" },
        { name: "부장" },
      ],
    },
  ];

  return (
    <>
      <SignUpUI
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        onClickSignUp={onClickSignUp}
        departments={departments}
        ranks={ranks}
      />
    </>
  );
}
