import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 89vh;
  display: flex;
  justify-content: space-between;
`;

export const LoginForm = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginInput = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const LoginButton = styled.button`
  width: 100px;
  height: 30px;
  font-weight: bold;
`;
