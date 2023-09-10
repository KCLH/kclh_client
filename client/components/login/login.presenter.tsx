"use client";
import { Box, Button, TextField } from "@mui/material";
import MyCarousel from "@/components/layout/carousel";
import * as s from "@/components/login/login.styles";
import { CAROUSEL_IMG } from "@/components/utils/Constant";

export default function LoginUI(props: any) {
  return (
    <s.Wrapper>
      <MyCarousel images={CAROUSEL_IMG} />

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
        <TextField
          {...props.register("employee_num")}
          sx={{ m: 1.5, minWidth: 120 }}
          required
          fullWidth
          id="filled-required"
          label="사원번호"
          name="employee_num"
          autoComplete="employee_num"
          autoFocus
          // variant="filled"
        />
        <TextField
          {...props.register("user_pwd")}
          sx={{ m: 1.5, minWidth: 120 }}
          required
          fullWidth
          name="user_pwd"
          label="비밀번호"
          type="password"
          id="filled-password-input"
          autoComplete="current-password"
          // variant="filled"
        />

        <Button
          sx={{ m: 1.5, minWidth: 120, minHeight: 40 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          로그인
        </Button>
      </Box>
    </s.Wrapper>
  );
}
