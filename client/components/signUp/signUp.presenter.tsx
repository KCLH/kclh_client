"use client";

import {
  TextField,
  Button,
  Box,
  // Select,
  // MenuItem,
  // InputLabel,
  // FormControl,
  // SelectChangeEvent,
} from "@mui/material";
import styled from "@emotion/styled";
// import { useState } from "react";
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
  // const [department, setDepartment] = useState("");
  // const [rank, setRank] = useState("");
  // const [factory, setFactory] = useState("");
  // const [role, setRole] = useState("");

  // const handleDepartmentChange = (event: SelectChangeEvent) => {
  //   setDepartment(event.target.value);
  // };

  // const handleRankChange = (event: SelectChangeEvent) => {
  //   setRank(event.target.value);
  // };

  // const handleFactoryChange = (event: SelectChangeEvent) => {
  //   setFactory(event.target.value);
  // };

  // const handleRoleChange = (event: SelectChangeEvent) => {
  //   setRole(event.target.value);
  // };

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

        {/* <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
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
            {DEPARTMENTS.map((department) => (
              <MenuItem value={department}>{department}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <CustomSelect
          label="부서"
          options={DEPARTMENTS}
          register={props.register}
        />

        {/* <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
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
            {RANKS.map((rank) => (
              <MenuItem value={rank}>{rank}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <CustomSelect label="직급" options={RANKS} register={props.register} />

        {/* <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
          <InputLabel id="factory-label">공장</InputLabel>
          <Select
            {...props.register("factory")}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={factory}
            onChange={handleRankChange}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            {FACTORY.map((fac) => (
              <MenuItem value={fac}>{fac}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <CustomSelect
          label="공장"
          options={FACTORY}
          register={props.register}
        />

        {/* <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
          <InputLabel id="role-label">권한</InputLabel>
          <Select
            {...props.register("adminOk")}
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={role}
            onChange={handleRankChange}
          >
            <MenuItem value="">
              <em>선택</em>
            </MenuItem>
            {ROLES.map((role) => (
              <MenuItem value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl> */}
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
