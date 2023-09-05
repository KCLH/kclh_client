"use client";

import {
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import * as s from "@/components/signUp/signUp.styles";
import { useState } from "react";

export default function SignUpUI(props: any) {
  const [department, setDepartment] = useState("");
  const [rank, setRank] = useState("");

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };

  const handleRankChange = (event: SelectChangeEvent) => {
    setRank(event.target.value);
  };

  return (
    <s.Wrapper>
      <h1 style={{ padding: "5px 0", color: "#262626" }}>사원 등록</h1>
      {/* <s.SignUpFrom> */}
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
        {/* <s.Text>이름</s.Text> */}
        {/* <s.Input placeholder="이름을 입력하세요" /> */}
        <TextField
          // fullWidth
          {...props.register("employee_name")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="이름"
          variant="filled"
        />
        {/* <s.Text>연락처</s.Text> */}
        {/* <s.Input placeholder="연락처를 입력하세요" /> */}
        <TextField
          // fullWidth
          {...props.register("phone")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="연락처"
          variant="filled"
        />
        {/* <s.Text>이메일</s.Text> */}
        {/* <s.Input placeholder="이메일을 입력하세요" /> */}
        <TextField
          // fullWidth
          {...props.register("email")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="이메일"
          variant="filled"
        />
        {/* <s.Text>부서</s.Text> */}
        {/* <s.Select>
            <s.Options value="0" selected>
              부서를 선택하세요
            </s.Options>
            <s.Options>2</s.Options>
            <s.Options>3</s.Options>
          </s.Select> */}

        <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
          <InputLabel id="department-label">부서</InputLabel>
          <Select
            {...props.register("department")}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={department}
            onChange={handleDepartmentChange}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            <MenuItem value={"구매"}>구매</MenuItem>
            <MenuItem value={"제조"}>제조</MenuItem>
            <MenuItem value={"생산기술"}>생산기술</MenuItem>
            <MenuItem value={"생산관리"}>생산관리</MenuItem>
            <MenuItem value={"품질관리"}>품질관리</MenuItem>
          </Select>
        </FormControl>
        {/* <s.Text>직급</s.Text> */}
        {/* <s.Select>
            <s.Options>1</s.Options>
            <s.Options>2</s.Options>
            <s.Options>3</s.Options>
          </s.Select> */}
        <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
          <InputLabel id="rank-label">직급</InputLabel>
          <Select
            {...props.register("rank")}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={rank}
            onChange={handleRankChange}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            <MenuItem value={"사원"}>사원</MenuItem>
            <MenuItem value={"주임"}>주임</MenuItem>
            <MenuItem value={"대리"}>대리</MenuItem>
            <MenuItem value={"과장"}>과장</MenuItem>
            <MenuItem value={"차장"}>차장</MenuItem>
            <MenuItem value={"부장"}>부장</MenuItem>
          </Select>
        </FormControl>

        <s.BtnWrapper>
          {/* <s.Btn>등록</s.Btn>
            <s.Btn>취소</s.Btn> */}
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
        </s.BtnWrapper>
      </Box>
      {/* </s.SignUpFrom> */}
    </s.Wrapper>
  );
}
