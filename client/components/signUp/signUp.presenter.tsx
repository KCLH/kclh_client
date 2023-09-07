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
// import * as s from "@/components/signUp/signUp.styles";
import styled from "@emotion/styled";
import { useState } from "react";

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
    // <s.Wrapper>
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

        <TextField
          // fullWidth
          {...props.register("email")}
          sx={{ m: 1.5, minWidth: 120 }}
          id="filled-basic"
          label="이메일"
          variant="filled"
        />

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
            {}
            <MenuItem value={"구매"}>구매</MenuItem>
            <MenuItem value={"제조"}>제조</MenuItem>
            <MenuItem value={"생산기술"}>생산기술</MenuItem>
            <MenuItem value={"생산관리"}>생산관리</MenuItem>
            <MenuItem value={"품질관리"}>품질관리</MenuItem>
          </Select>
        </FormControl>

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
            {props.departments.map((department: any) => (
              <>
                <MenuItem value={department.name}>{department.name}</MenuItem>
              </>
            ))}
            {/* <MenuItem value={"사원"}>사원</MenuItem>
            <MenuItem value={"주임"}>주임</MenuItem>
            <MenuItem value={"대리"}>대리</MenuItem>
            <MenuItem value={"과장"}>과장</MenuItem>
            <MenuItem value={"차장"}>차장</MenuItem>
            <MenuItem value={"부장"}>부장</MenuItem> */}
          </Select>
        </FormControl>

        {/* <s.BtnWrapper> */}
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
        {/* </s.BtnWrapper> */}
      </Box>
    </Wrapper>
    // </s.Wrapper>
  );
}
