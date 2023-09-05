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

  // const onClickSignUp = async (data: FormValue) => {
  //   if (
  //     !(
  //       data.employee_name &&
  //       data.phone &&
  //       data.email &&
  //       data.department &&
  //       data.rank
  //     )
  //   ) {
  //     return;
  //   }
  //   try {
  //     const res = await axios.post(createUserEndpoint, {
  //       employee_name: data.employee_name,
  //       phone: data.phone,
  //       email: data.email,
  //       department: data.department,
  //       rank: data.rank,
  //     });
  //     if (res.status === 200) {
  //       router.push("/login");
  //     }
  //     router.push("/factory/1");
  //   } catch (error) {
  //     if (error instanceof Error) console.error(error);
  //   }
  // };
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

  return (
    <>
      <SignUpUI
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        onClickSignUp={onClickSignUp}
      />
    </>
  );
}
