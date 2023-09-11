import * as yup from "yup";

export interface FormValue {
  employee_num: number;
  user_pwd: string;
  name?: any;
}

export const schema = yup.object({
  employee_num: yup
    .number()
    .typeError("사원번호는 숫자여야 합니다.")
    .required("사원번호를 입력하세요"),
  user_pwd: yup.string().required("비밀번호를 입력하세요"),
});
