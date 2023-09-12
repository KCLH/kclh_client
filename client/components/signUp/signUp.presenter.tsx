"use client";

import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  DEPARTMENTS,
  RANKS,
  FACTORY,
  ROLES,
} from "@/components/utils/constants";
import { SignUpUIProps } from "@/components/utils/SignUp";
import { Controller } from "react-hook-form";

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
          pt: 5,
          pb: 5,
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
          sx={
            !!props.errors.employee_name
              ? { minWidth: 120 }
              : { pb: 2, minWidth: 120 }
          }
          required
          fullWidth
          variant="standard"
          id="filled-required"
          label="이름"
          name="employee_name"
          autoComplete="employee_name"
          autoFocus
          helperText={props.errors.employee_name?.message}
          error={!!props.errors.employee_name}
        />
        <TextField
          {...props.register("phone")}
          sx={
            !!props.errors.phone ? { minWidth: 120 } : { pb: 2, minWidth: 120 }
          }
          required
          fullWidth
          variant="standard"
          id="filled-required"
          label="연락처"
          name="phone"
          autoComplete="phone"
          autoFocus
          helperText={props.errors.phone?.message}
          error={!!props.errors.phone}
        />

        {/* 부서 */}
        <FormControl
          variant="standard"
          // variant="outlined"
          sx={{ minWidth: 120 }}
          fullWidth
        >
          <InputLabel id="departments-select-label">부서 *</InputLabel>
          <Controller
            name="department"
            control={props.control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} error={!!props.errors.department}>
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                {DEPARTMENTS.map((department, idx) => (
                  <MenuItem key={idx} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {props.errors.department ? (
            <FormHelperText error>
              {props.errors.department.message}
            </FormHelperText>
          ) : (
            <FormHelperText sx={{ mb: 2 }}></FormHelperText>
          )}
        </FormControl>

        {/* 직급 */}
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="departments-select-label">직급 *</InputLabel>
          <Controller
            name="rank"
            control={props.control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} error={!!props.errors.rank}>
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                {RANKS.map((rank, idx) => (
                  <MenuItem key={idx} value={rank}>
                    {rank}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {props.errors.rank ? (
            <FormHelperText error>{props.errors.rank.message}</FormHelperText>
          ) : (
            <FormHelperText sx={{ mb: 2 }}></FormHelperText>
          )}
        </FormControl>

        {/* 공장 */}
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="departments-select-label">공장 *</InputLabel>
          <Controller
            name="factory"
            control={props.control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} error={!!props.errors.factory}>
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                {FACTORY.map((fac, idx) => (
                  <MenuItem key={idx} value={fac}>
                    {fac}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {props.errors.factory ? (
            <FormHelperText error>
              {props.errors.factory.message}
            </FormHelperText>
          ) : (
            <FormHelperText sx={{ mb: 2 }}></FormHelperText>
          )}
        </FormControl>

        {/* 권한 */}
        <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="departments-select-label">권한 *</InputLabel>
          <Controller
            name="admin_ok"
            control={props.control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} error={!!props.errors.admin_ok}>
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                {ROLES.map((role, idx) => (
                  <MenuItem key={idx} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {props.errors.admin_ok ? (
            <FormHelperText error>
              {props.errors.admin_ok.message}
            </FormHelperText>
          ) : (
            <FormHelperText sx={{ mb: 2 }}></FormHelperText>
          )}
        </FormControl>

        <BtnWrapper>
          <Button
            sx={{ minWidth: 100, minHeight: 40 }}
            type="submit"
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
