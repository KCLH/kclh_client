import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function userInfo() {
  const [modalContent, setModalContent] = useState(null); // 모달 내용
  const [touchPW, setTouchPW] = useState(false); // 모달 내용 결정 요소
  const [inputInfo, setInputInfo] = useState({
    pw: "",
    celN: "",
    email: "",
  });
  const [userInfo, setUserInfo] = useState({
    userName: "이름",
    EINumber: 0,
    department: "부서명",
    position: "직급명",
    celN: "연락처",
    email: "이메일",
  });

  // 백에서 userInfo 가져오기
  const getData = async () => {
    try {
      const response = await axios.get("라우터");
      const { userInfo } = response.data;
      setUserInfo({
        userName,
        EINumber,
        department,
        position,
        celN,
        email,
      });
    } catch (error) {
      alert(error);
      if (error === null) {
        console.log("null을 디폴트로 처리");
      }
    }
  };

  // 연락처 중복체크
  const checkCelN = async () => {
    try {
      const response = await axios.get("라우터", {
        params: {
          celN,
        },
      });
      if (response.data === true) {
      }
    } catch (error) {
      if (error.code !== 200) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  // 이메일 중복체크
  const checkEmail = async () => {
    try {
      const response = await axios.get("라우터", {
        params: {
          email,
        },
      });
      if (response.data === true) {
      }
    } catch (error) {
      if (error.code !== 200) {
        alert(`${error.response.data.message}`);
      } else {
        alert(error);
      }
    }
  };

  // input값 가져오기
  const handleChange = (e) => {
    setInputInfo({
      [e.target.id]: e.target.value,
    });
  };

  // 백에 수정사항 보내기
  const putData = async (e) => {
    try {
      const pw = inputInfo.pw;
      const celN = inputInfo.celN;
      const email = inputInfo.email;
      const response = await axios.put("라우터", {
        email,
        celN,
        pw,
      });
      if (touchPW === true) {
        setModalContent({});
      } else {
        setModalContent({});
      }
    } catch (error) {
      if (touchPW === true) {
        setModalContent({});
      } else {
        setModalContent({});
      }
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalContent(null);
  };

  // 렌더링 될 때 마다 실행
  useEffect(() => {
    getData();
  }, [modalContent]);

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
        <input
          className="PW"
          id="pw"
          type="text"
          placeholder="비밀번호를 입력하세요"
          onChange={[handleChange, setTouchPW(true)]}
        />
        <form className="변경사항" onSubmit={checkCelN}>
          <input
            className="인적사항"
            id="celN"
            type="text"
            value={userInfo.celN}
            onChange={handleChange}
          />
          <button className="변경버튼" type="submit">
            중복
          </button>
        </form>
        <form className="변경사항" onSubmit={checkEmail}>
          <input
            className="인적사항"
            id="email"
            type="text"
            value={userInfo.email}
            onChange={handleChange}
          />
          <button className="변경버튼">중복</button>
        </form>
        <button onClick={putData}>저장</button>
      </div>
      {modalContent && (
        <Modal
          onClose={onClose}
          aria-labelledby="custom-modal-title"
          aria-describedby="custom-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              textAlign: "center",
              fontFamily: "DungGeunMo",
            }}
          >
            <Typography id="custom-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <Typography id="custom-modal-description">{message}</Typography>
            <button
              onClick={closeModal}
              className={isError ? "nes-btn is-error" : "nes-btn is-success"}
            >
              X
            </button>
          </Box>
        </Modal>
      )}
    </div>
  );
}
