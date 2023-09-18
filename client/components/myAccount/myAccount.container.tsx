"use client";

// import { withAuth } from "@/components/utils/withAuth";
import MyAccountUI from "@/components/myAccount/myAccount.presenter";

import axios from "axios";
import { API_URL } from "@/components/utils/Token";
import useCurrentUser from "../hooks/useCurrentUser";
import React, { useEffect, useState } from "react";

function MyAccountContainer() {
  const [modalContent, setModalContent] = useState(null); // 모달 내용
  const [touchPW, setTouchPW] = useState(false); // 모달 내용 결정 요소
  const [inputInfo, setInputInfo] = useState({
    user_pwd: "",
    phone: "",
  }); // 변경 내용
  const [userInfo, setUserInfo] = useState({
    employee_name: "이름",
    employee_num: "00",
    department: "부서명",
    rank: "직급명",
    phone: "연락처",
    email: "이메일",
    factory: "담당지",
  }); // 내 계정 정보

  // 백에서 userInfo 가져오기
  const { userData } = useCurrentUser();
  const getData = async () => {
    try {
      // GET 요청을 보낼 URL과 데이터를 설정합니다.
      const id = userData?.employeeNum;
      const url = `${API_URL}/employee/myData${id}`;
      const response = await axios.get(url);
      console.log("여기야", response.data);
      if (response.status === 200) {
        console.log("userInfo1:", userInfo);
        setUserInfo(response.data);
        console.log("userInfo2:", userInfo);
      } else {
        console.error("Update failed:", response);
      }
    } catch (error) {
      console.error("An error occurred while updating:", error);
    }
  };

  // input값 가져오기
  const handleChange = (e: any) => {
    if (e && e.target) {
      setInputInfo((prevInputInfo) => ({
        ...prevInputInfo,
        [e.target.id]: e.target.value,
      }));
    }
  };

  // // 연락처 중복체크
  // const checkPhone = async () => {
  //   try {
  //     const inputPhone = inputInfo.phone;
  //     const url = `${API_URL}/employee/phoneCheck`;
  //     const response = await axios.get(url);
  //     if (response.status === 200) {
  //       setUserInfo(response.data);
  //     } else {
  //       console.error("Update failed:", response);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while updating:", error);
  //   }
  // };

  // // 백에 수정사항 보내기
  // const putData = async () => {
  //   try {
  //     const user_pwd = inputInfo.user_pwd;
  //     const phone = inputInfo.phone;
  //     const response = await axios.put(
  //       `/employee/update/${userData?.employeeNum}`,
  //       {
  //         phone,
  //         user_pwd,
  //       }
  //     );
  //     if (touchPW === true) {
  //       setModalContent(null);
  //     } else {
  //       setModalContent(null);
  //     }
  //   } catch (error) {
  //     if (touchPW === true) {
  //       setModalContent(null);
  //     } else {
  //       setModalContent(null);
  //     }
  //   }
  // };

  // // 모달 닫기
  // const closeModal = () => {
  //   setModalContent(null);
  // };

  // 렌더링 될 때 마다 실행
  useEffect(() => {
    getData();
  }, []);

  return (
    <MyAccountUI
      userInfo={userInfo}
      // handleChange={handleChange}
      // setTouchPW={setTouchPW}
      // checkPhone={checkPhone}
      // putData={putData}
    />
  );
}

// export default withAuth(MyAccountContainer);
export default MyAccountContainer;
