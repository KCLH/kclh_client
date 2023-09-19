"use client";

import * as s from "@/components/myAccount/myAccount.styles";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export default function MyAccountUI(props: any) {
  const [phoneValue, setPhoneValue] = useState("");
  const [touchPW, setTouchPW] = useState(false); // 저장 버튼 조건
  return (
    <Wrapper>
      <Box
        component="form"
        onSubmit={props.handleSubmit(
          touchPW ? props.putData : props.putPhoneData
        )}
        sx={{
          "& > :not(style)": { width: "25ch" },
          pt: 3,
          pb: 3,
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
        <s.인적사항>{props.userInfo?.employee_name}</s.인적사항>
        <AccountCircleRoundedIcon sx={{ fontSize: 60 }} />
        <s.인적사항>{props.userInfo?.employee_num}</s.인적사항>
        <s.인적사항>{props.userInfo?.department}</s.인적사항>
        <s.인적사항>{props.userInfo?.rank}</s.인적사항>
        <s.인적사항>{props.userInfo?.factory}</s.인적사항>
        <s.인적사항>{props.userInfo?.email}</s.인적사항>
        <s.변경사항>
          <TextField
            {...props.register("user_pwd")}
            name="user_pwd"
            type="password"
            label="비밀번호를 입력하세요"
            helperText={props.errors.user_pwd?.message}
            error={!!props.errors.user_pwd}
            onChange={() => setTouchPW(true)}
            variant="standard"
          />
        </s.변경사항>
        <s.변경사항>
          <TextField
            {...props.register("phone")}
            name="phone"
            type="text"
            label={props.userInfo?.phone}
            helperText={
              !props.checkSame
                ? "다시 확인해주세요"
                : props.errors.phone?.message || ""
            }
            error={!!props.errors.phone || !props.checkSame}
            onChange={(e: any) => setPhoneValue(e.target.value)}
            variant="standard"
          />
          <Button
            type="button"
            variant="outlined"
            onClick={() => props.checkPhone(phoneValue)}
          >
            확인
          </Button>
        </s.변경사항>
        <Button type="submit" variant="contained">
          저장
        </Button>
      </Box>
    </Wrapper>
  );
}
