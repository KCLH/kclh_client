"use client";

import * as s from "@/components/myAccount/myAccount.styles";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function MyAccountUI(props: any) {
  const [phoneValue, setPhoneValue] = useState("");
  return (
    <>
      <s.사원증>
        <s.이름>{props.userInfo?.employee_name}</s.이름>
        <s.사원사진 />
        <s.인적사항>{props.userInfo?.employee_num}</s.인적사항>
        <s.소속>
          <s.인적사항>{props.userInfo?.department}</s.인적사항>
          <s.인적사항>{props.userInfo?.rank}</s.인적사항>
        </s.소속>
        <s.인적사항>{props.userInfo?.factory}</s.인적사항>
        <s.인적사항>{props.userInfo?.email}</s.인적사항>
        <Box
          component="form"
          onSubmit={props.handleSubmit(props.putData)}
          noValidate
          autoComplete="off"
        >
          <s.변경사항>
            <TextField
              {...props.register("user_pwd")}
              name="user_pwd"
              type="password"
              label="비밀번호를 입력하세요"
              helperText={props.errors.user_pwd?.message}
              error={!!props.errors.user_pwd}
            />
          </s.변경사항>
          <s.변경사항>
            <TextField
              {...props.register("phone")}
              name="phone"
              type="text"
              label={props.userInfo?.phone}
              helperText={props.errors.phone?.message}
              error={!!props.errors.phone}
              onChange={(e: any) => setPhoneValue(e.target.value)}
            />
            <Button type="button" onClick={() => props.checkPhone(phoneValue)}>
              중복
            </Button>
          </s.변경사항>
          <Button type="submit">저장</Button>
        </Box>
      </s.사원증>
    </>
  );
}
