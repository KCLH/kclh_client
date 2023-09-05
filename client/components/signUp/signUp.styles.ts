import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const SignUpFrom = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 5px 5px 5px gray;
  padding: 30px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-bottom: 20px;
`;

export const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const Select = styled.select`
  width: 324px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const Options = styled.option`
  width: 300px;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 10px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-around;
  align-items: center;
  margin: 15px;
`;

export const Btn = styled.button`
  width: 150px;
  height: 40px;
  font-weight: bold;
`;
