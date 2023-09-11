import {
  Control,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import * as yup from "yup";

export interface FormValue {
  employee_name: string;
  phone: string;
  department: string;
  rank: string;
  factory: string;
  admin_ok: string;
}

export const schema = yup.object({
  employee_name: yup.string().required("이름을 입력하세요"),
  phone: yup.string().required("폰번호를 입력하세요"),
  department: yup.string().required("부서를 선택하세요"),
  rank: yup.string().required("직급을 선택하세요"),
  factory: yup.string().required("공장을 선택하세요"),
  admin_ok: yup.string().required("권한을 선택하세요"),
});

export interface SignUpUIProps {
  register: UseFormRegister<FormValue>;
  handleSubmit: UseFormHandleSubmit<FormValue>;
  formState: FormState<FormValue>;
  control: Control<FormValue>; // 추가된 부분
  onClickSignUp: (data: FormValue) => Promise<void>; // onClickSignUp의 타입은 실제 함수에 따라서 변경.
}
