import * as yup from "yup";

export interface FormValue {
  employee_name: string;
  phone: string;
  email: string;
  department: string;
  rank: string;
}

export const schema = yup.object({
  employee_name: yup.string().required("이름을 입력하세요"),
  phone: yup.string().required("폰번호를 입력하세요"),
  email: yup
    .string()
    .email("이메일 형식이 아닙니다.")
    .required("이메일을 입력하세요"),
  department: yup.string().required("부서를 입력하세요"),
  rank: yup.string().required("직급을 입력하세요"),
});
