import * as yup from "yup";

export interface typeInputData {
  employee_num?: number;
  user_pwd: string;
  phone: string;
}

export const schema = yup.object({
  phone: yup
    .string()
    .matches(
      /^01[016789]-\d{3,4}-\d{4}$/,
      "휴대전화 번호의 형식에 맞지 않습니다"
    )
    .required("휴대전화 번호를 입력해주세요"),
  user_pwd: yup.string(),
});
