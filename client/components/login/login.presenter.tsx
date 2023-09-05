"use client";

import MyCarousel from "@/components/layout/carousel";
import * as s from "@/components/login/login.styles";

export default function LoginUI(props: any) {
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

  return (
    <s.Wrapper>
      <MyCarousel images={images} />
      {/* <s.LoginForm
        onSubmit={(e) => {
          e.preventDefault();
          const id = e.target.id.value;
          const pw = e.target.pw.value;
          const options = {
            method: "POST",
            Headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, pw }),
          };
          fetch(`http://localhost:9999/topics`, options)
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              const lastid = result.id;
              router.refresh();
              router.push(`/factory/${lastid}`);
            });
          router.push(`/factory/1`);
        }}
      > */}
      <s.LoginForm onSubmit={props.handleSubmit(props.onClickLogin)}>
        <s.LoginInput
          type="text"
          placeholder="사원번호"
          {...props.register("userNum")}
        />
        <s.LoginInput
          type="text"
          placeholder="비밀번호"
          {...props.register("password")}
        />
        {/* <s.LoginInput type="text" name="id" placeholder="사원번호" />
        <s.LoginInput type="text" name="pw" placeholder="비밀번호" /> */}
        <s.LoginButton type="submit" onClick={props.onClickLogin}>
          로그인
        </s.LoginButton>
      </s.LoginForm>
    </s.Wrapper>
  );
}
