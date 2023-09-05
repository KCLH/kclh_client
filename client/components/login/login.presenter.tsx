"use client";
import { Box, Button, TextField } from "@mui/material";
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
      {/* <s.LoginForm onSubmit={props.handleSubmit(props.onClickLogin)}> */}
      <Box
        component="form"
        onSubmit={props.handleSubmit(props.onClickLogin)} // onSubmit 핸들러 추가
        sx={{
          "& > :not(style)": { width: "25ch" },
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          padding: 3,
          width: "40%",
          alignItems: "center", // 세로 축 중앙 정렬
          justifyContent: "center", // 가로 축 중앙 정렬
        }}
        noValidate
        autoComplete="off"
      >
        {/* <s.LoginInput
          type="text"
          placeholder="사원번호"
          {...props.register("userNum")}
        />
        <s.LoginInput
          type="text"
          placeholder="비밀번호"
          {...props.register("password")}
        /> */}
        <TextField
          sx={{ m: 1.5, minWidth: 120 }}
          required
          id="filled-required"
          label="사원번호"
          variant="filled"
          // {...props.register("userNum")}
        />
        <TextField
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-password-input"
          label="비밀번호"
          type="password"
          autoComplete="current-password"
          variant="filled"
          // {...props.register("password")}
        />
        {/* <s.LoginInput type="text" name="id" placeholder="사원번호" />
        <s.LoginInput type="text" name="pw" placeholder="비밀번호" /> */}
        {/* <s.LoginButton type="submit" onClick={props.onClickLogin}>
          로그인
        </s.LoginButton> */}
        <Button
          sx={{ m: 1.5, minWidth: 120, minHeight: 40 }}
          variant="outlined"
          type="submit"
        >
          로그인
        </Button>
      </Box>

      {/* </s.LoginForm> */}
    </s.Wrapper>
  );
}
