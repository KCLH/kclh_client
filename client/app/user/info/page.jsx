import axios from "axios";
import React, { useEffect, useState } from "react";

export default function userInfo() {
  const [showModal, setShowModal] = useState(false); // 모달
  const [userInfo, setUserInfo] = useState({
    userName: "이름",
    EINumber: 0,
    department: "부서명",
    position: "직급명",
    phoneNumber: "연락처",
    email: "이메일",
  });

  // 모달 열기
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 백에서 userInfo 가져오기
  const getData = async () => {
    try {
      const response = await axios.get("라우터 넣어주세요");
      const { userInfo } = response.data;
      setUserInfo({
        userName,
        EINumber,
        department,
        position,
        phoneNumber,
        email,
      });
    } catch (error) {
      alert(error);
      if (error === null) {
        console.log("null을 디폴트로 처리");
      }
    }
  };

  useEffect(() => {
    getData();
  }, [showModal]);

  return (
    <div>
      <Headers />
      <div className="사원증">
        <p className="이름">{userInfo.userName}</p>
        <img src="" />
        <p className="인적사항">{userInfo.EINumber}</p>
        <div className="소속">
          <p className="인적사항">{userInfo.department}</p>
          <p className="인적사항">{userInfo.position}</p>
        </div>
        <div className="변경사항">
          <p className="인적사항">{userInfo.phoneNumber}</p>
          <button className="변경버튼">변경</button>
        </div>
        <div className="변경사항">
          <p className="인적사항">{userInfo.email}</p>
          <button className="변경버튼">변경</button>
        </div>
        <button>PW 변경</button>
      </div>
    </div>
  );
}
