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
  user_pwd: yup
    .string()
    .min(6, "6글자 이상 10글자 이하로 입력해주세요")
    .max(10, "6글자 이상 10글자 이하로 입력해주세요")
    .required("비밀번호를 입력해주세요"),
});
