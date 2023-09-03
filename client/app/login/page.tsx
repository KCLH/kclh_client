"use client";

import { useRouter } from "next/navigation";
import * as s from "./login.style";
import MyCarousel from "../../components/carousel";

export default function LoginPage() {
  const images = [
    {
      src: "/boardGame.jpg",
      alt: "보드게임 제품 이미지",
    },
    {
      src: "/factory_in.jpg",
      alt: "공장 내부 이미지",
    },
    {
      src: "/factory_out.jpg",
      alt: "공장 외부 이미지",
    },
  ];
  const router = useRouter();

  return (
    <s.Wrapper>
      <MyCarousel images={images} />

      <s.LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          // const id = e.target.id.value;
          // const pw = e.target.pw.value;
          // const options = {
          //   method: "POST",
          //   Headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ id, pw }),
          // };
          // fetch(`http://localhost:9999/topics`, options)
          //   .then((res) => res.json())
          //   .then((result) => {
          //     console.log(result);
          //     const lastid = result.id;
          //     router.refresh();
          //     router.push(`/factory/${lastid}`);
          //   });
          router.push(`/factory/1`);
        }}
      >
        <s.LoginInput type="text" name="id" placeholder="사원번호" />
        <s.LoginInput type="text" name="pw" placeholder="비밀번호" />
        <s.LoginButton type="submit">로그인</s.LoginButton>
      </s.LoginForm>
    </s.Wrapper>
  );
}
