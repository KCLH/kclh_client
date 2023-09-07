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
  register: (...args: any[]) => any;
  handleSubmit: (...args: any[]) => any;
  formState: Record<string, any>;
  onClickSignUp: (data: any) => Promise<void>;
}
