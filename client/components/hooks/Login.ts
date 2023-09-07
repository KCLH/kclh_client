import * as yup from "yup";

export interface FormValue {
  userid: number;
  password: string;
}

export const schema = yup.object({
  userid: yup.number().required("사원번호를 입력하세요"),
  password: yup.string().required("비밀번호를 입력하세요"),
});
