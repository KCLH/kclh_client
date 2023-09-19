"use client";

// import { withAuth } from "@/components/utils/withAuth";
import MyAccountUI from "@/components/myAccount/myAccount.presenter";

import axios from "axios";
import useAxios from "@/components/hooks/useAxios";
import { API_URL } from "@/components/utils/Token";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import LoadingComponent from "../layout/Loading";
import { schema, typeInputData } from "../utils/myAccount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

function MyAccountContainer() {
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorCode, setErrorCode] = useState(Number);

  const [checkSame, setCheckSame] = useState(true); // 중복 확인

  const router = useRouter();

  // 백에서 userInfo 가져오기
  const { userData } = useCurrentUser();
  const id = userData?.employeeNum;
  const [{ data, loading, error }, getData] = useAxios(
    `${API_URL}/employee/myData${id}`
  );
  // 렌더링 될 때 마다 실행
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, getData]);
  // 서버로부터 받아온 데이터를 userInfo에 저장.
  const userInfo = data;
  // 관련 처리
  if (error) {
    setOpenErrorSnackbar(true);
    setErrorCode(3);
  }

  // 연락처 중복체크
  const checkPhone = async (phoneValue: string) => {
    try {
      const inputPhone = { phone: phoneValue };
      const url = `${API_URL}/employee/phoneCheck`;
      const response = await axios.post(url, inputPhone);
      if (response.data === "Y") {
        setCheckSame(true);
      } else {
        setCheckSame(false);
      }
    } catch (error) {
      setOpenErrorSnackbar(true);
      setErrorCode(2);
    }
  };

  // Input data를 저장할 ref 생성
  const inputInfo = useRef<typeInputData | null>(null);
  // input값 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeInputData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Error 메세지 출력
  let alertMessage: string;
  switch (errorCode) {
    case 1:
      alertMessage = "변경에 실패했습니다";
      break;
    case 2:
      alertMessage = "중복 확인에 실패했습니다";
      break;
    case 3:
      alertMessage = "정보를 가져오는 것에 실패했습니다";
      break;
    default:
      alertMessage = "알 수 없는 오류가 발생했습니다";
  }

  // 백에 수정사항 연락처만 보내기
  const putPhoneData = async (data: typeInputData) => {
    inputInfo.current = data;
    console.log("인풋값:", inputInfo.current);

    const updateUserInput: typeInputData = {};
    updateUserInput.employee_num = id;
    updateUserInput.phone = inputInfo.current.phone;

    if (!inputInfo.current.phone && !inputInfo.current.employee_num) {
      setOpenWarningSnackbar(true);
    }

    try {
      const url = `${API_URL}/employee/updatePhone${id}`;
      const updatedData = {
        ...updateUserInput,
      };
      const response = await axios.put(url, updatedData);
      if (response.statusText === "OK") {
        setOpenSuccessSnackbar(true);
        setSuccess(false);
      }
    } catch (err) {
      setOpenErrorSnackbar(true);
      setErrorCode(1);
    }
  };

  // 백에 수정사항 전부 보내기
  const putData = async (data: typeInputData) => {
    inputInfo.current = data;
    console.log("인풋값:", inputInfo.current);

    const updateUserInput: typeInputData = {};
    updateUserInput.employee_num = id;
    updateUserInput.phone = inputInfo.current.phone || userInfo.phone;
    updateUserInput.user_pwd = inputInfo.current.user_pwd;
    console.log(updateUserInput);

    if (
      !inputInfo.current.phone &&
      !inputInfo.current.user_pwd &&
      !inputInfo.current.employee_num
    ) {
      setOpenWarningSnackbar(true);
    }

    try {
      const url = `${API_URL}/employee/update${id}`;
      const updatedData = {
        ...updateUserInput,
      };
      if (checkSame) {
        const response = await axios.put(url, updatedData);
        if (response.statusText === "OK") {
          setOpenSuccessSnackbar(true);
          setSuccess(true);
          router.push("/login");
        }
      }
    } catch (err) {
      setOpenErrorSnackbar(true);
      setErrorCode(1);
    }
  };

  return (
    <>
      {loading ? <LoadingComponent /> : <></>}
      <MyAccountUI
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        userInfo={userInfo}
        checkPhone={checkPhone}
        putData={putData}
        putPhoneData={putPhoneData}
        checkSame={checkSame}
      />
      <Snackbar
        open={openWarningSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenWarningSnackbar(false)}
      >
        <Alert severity="warning">수정사항이 없습니다</Alert>
      </Snackbar>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <Alert severity="error">{alertMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        {success ? (
          <Alert severity="success">
            변경이 완료되었습니다
            <br />
            다시 로그인해주세요
          </Alert>
        ) : (
          <Alert severity="success">변경이 완료되었습니다</Alert>
        )}
      </Snackbar>
    </>
  );
}

// export default withAuth(MyAccountContainer);
export default MyAccountContainer;
