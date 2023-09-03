import styled from "@emotion/styled";
// import { Container } from "@mui/material";

export const Wrapper = styled.div`
  width: 100%;
  height: 89vh;
  display: flex;
  justify-content: space-between;
  background-color: blanchedalmond;
`;

export const LoginForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: aqua;
`;

export const LoginInput = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;

  /* &::placeholder {
    color: gray;
    font-style: italic;
    font-size: 14px;
  } */
`;

// // 첫 번째 입력 필드에는 "사원번호" 플레이스홀더 텍스트 지정
// export const EmployeeNumberInput = styled(LoginInput)`
//   &::placeholder {
//     content: "사원번호";
//   }
// `;

// // 두 번째 입력 필드에는 "비밀번호" 플레이스홀더 텍스트 지정
// export const PasswordInput = styled(LoginInput)`
//   &::placeholder {
//     content: "비밀번호";
//   }
// `;

export const LoginButton = styled.button`
  width: 100px;
  height: 30px;
  font-weight: bold;
`;
