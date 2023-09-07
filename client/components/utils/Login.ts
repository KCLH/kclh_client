import * as yup from "yup";

export interface FormValue {
  // userid: number;
  // password: string;
  employee_num: number;
  user_pwd: string;
}

export const schema = yup.object({
  employee_num: yup.number().required("사원번호를 입력하세요"),
  user_pwd: yup.string().required("비밀번호를 입력하세요"),
});
