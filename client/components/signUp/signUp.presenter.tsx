"use client";

import { TextField, Button, Box } from "@mui/material";
import styled from "@emotion/styled";
import {
  DEPARTMENTS,
  RANKS,
  FACTORY,
  ROLES,
} from "@/components/hooks/Constant";
import { SignUpUIProps } from "../hooks/SignUp";
import CustomSelect from "@/components/hooks/CustomSelect";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
`;

export default function SignUpUI(props: SignUpUIProps) {
  return (
    <Wrapper>
      <h1 style={{ padding: "5px 0", color: "#262626" }}>사원 등록</h1>
      <Box
        component="form"
        onSubmit={props.handleSubmit(props.onClickSignUp)}
        sx={{
          "& > :not(style)": { width: "25ch" },
          p: 3,
          display: "flex",
          flexDirection: "column",
          border: "2px solid gray",
          borderRadius: 5,
          backgroundColor: "#fff",
          boxShadow: "5px 5px 5px gray",
          width: 400,
          alignItems: "center", // 세로 축 중앙 정렬
          justifyContent: "center", // 가로 축 중앙 정렬
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          {...props.register("employee_name")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="이름"
          variant="filled"
        />

        <TextField
          {...props.register("phone")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="연락처"
          variant="filled"
        />

        <CustomSelect
          label="부서"
          options={DEPARTMENTS}
          register={props.register}
        />

        <CustomSelect label="직급" options={RANKS} register={props.register} />

        <CustomSelect
          label="공장"
          options={FACTORY}
          register={props.register}
        />

        <CustomSelect label="권한" options={ROLES} register={props.register} />

        <BtnWrapper>
          <Button
            type="submit"
            sx={{ minWidth: 100, minHeight: 40 }}
            variant="contained"
          >
            등록
          </Button>
          <Button sx={{ minWidth: 100, minHeight: 40 }} variant="outlined">
            취소
          </Button>
        </BtnWrapper>
      </Box>
    </Wrapper>
  );
}
