"use client";

// import { withAuth } from "@/components/utils/withAuth";
import MyAccountUI from "@/components/myAccount/myAccount.presenter";

import axios from "axios";
import useAxios from "@/components/hooks/useAxios";
import { API_URL } from "@/components/utils/Token";
import useCurrentUser from "../hooks/useCurrentUser";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import LoadingComponent from "../layout/Loading";
import { schema, typeInputData } from "../utils/myAccount";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function MyAccountContainer() {
  const [openErrorPutSnackbar, setOpenErrorPutSnackbar] = useState(false);
  const [openErrorGetSnackbar, setOpenErrorGetSnackbar] = useState(false);
  const [openErrorCheckSnackbar, setOpenErrorCheckSnackbar] = useState(false);
  const [openNoneSnackbar, setOpenNoneSnackbar] = useState(false);
  const [openChangeAllSnackbar, setOpenChangeAllSnackbar] = useState(false);

  const [touchPW, setTouchPW] = useState(false); // 저장 버튼 조건

  const [checkSame, setCheckSame] = useState(""); // 중복 확인

  // 백에서 userInfo 가져오기
  const { userData } = useCurrentUser();
  const id = userData?.employeeNum;
  const [{ data, loading, error }, getDate] = useAxios(
    `${API_URL}/employee/myData${id}`
  );
  // 렌더링 될 때 마다 실행
  useEffect(() => {
    if (id) {
      getDate();
    }
  }, [id]);
  // 서버로부터 받아온 데이터를 userInfo에 저장.
  const userInfo = data;
  // 관련 처리
  if (loading) return <LoadingComponent />;
  if (error)
    return (
      <Snackbar
        open={openErrorGetSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorGetSnackbar(false)}
      >
        <Alert severity="error">정보를 가져오는 것에 실패했습니다</Alert>
      </Snackbar>
    );

  // 연락처 중복체크
  const checkPhone = async (phoneValue: string) => {
    try {
      const inputPhone = { phone: phoneValue };
      const url = `${API_URL}/employee/phoneCheck`;
      const response = await axios.post(url, inputPhone);
      console.log("중복체크:", response);
    } catch (error) {
      setOpenErrorCheckSnackbar(true);
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

  // 백에 수정사항 보내기
  const putData = async (data: typeInputData) => {
    inputInfo.current = data;
    console.log("인풋값:", inputInfo.current);

    const updateUserInput: typeInputData = {};
    updateUserInput.employee_num = id;
    updateUserInput.phone = inputInfo.phone || userInfo.phone;
    updateUserInput.user_pwd = inputInfo.user_pwd;

    if (!inputInfo.phone && !inputInfo.user_pwd && !inputInfo.employee_num) {
      setOpenNoneSnackbar(true);
    }

    try {
      const url = `${API_URL}/employee/update${id}`;
      const updatedData = {
        ...updateUserInput,
      };
      const response = await axios.put(url, updatedData);
      if (response.statusText === "OK") {
        setOpenChangeAllSnackbar(true);
      }
    } catch (err) {
      setOpenErrorPutSnackbar(true);
    }
  };

  return (
    <>
      <MyAccountUI
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        userInfo={userInfo}
        checkPhone={checkPhone}
        putData={putData}
      />
      <Snackbar
        open={openNoneSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenNoneSnackbar(false)}
      >
        <Alert severity="error">수정사항이 없습니다</Alert>
      </Snackbar>
      <Snackbar
        open={openErrorPutSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorPutSnackbar(false)}
      >
        <Alert severity="error">변경에 실패했습니다</Alert>
      </Snackbar>
      <Snackbar
        open={openChangeAllSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenChangeAllSnackbar(false)}
      >
        <Alert severity="error">
          변경이 완료되었습니다
          <br />
          다시 로그인해주세요
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorCheckSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenErrorCheckSnackbar(false)}
      >
        <Alert severity="error">중복 확인에 실패했습니다</Alert>
      </Snackbar>
    </>
  );
}

// export default withAuth(MyAccountContainer);
export default MyAccountContainer;
