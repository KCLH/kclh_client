"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as s from "@/components/myAccount/myAccount.styles";

export default function MyAccountUI(props: any) {
  const [modalContent, setModalContent] = useState(null); // 모달 내용
  const [touchPW, setTouchPW] = useState(false); // 모달 내용 결정 요소
  const [inputInfo, setInputInfo] = useState({
    user_pwd: "",
    phone: "",
  });
  const [userInfo, setUserInfo] = useState({
    employee_name: "이름",
    employee_num: 0,
    department: "부서명",
    rank: "직급명",
    phone: "연락처",
    email: "이메일",
    factory: "담당지",
  });

  // 백에서 userInfo 가져오기
  const getData = async () => {
    try {
      const response = await axios.get("/employee/myData/1");
      const { userInfo } = response.data;
      setUserInfo({
        employee_name,
        employee_num,
        department,
        rank,
        phone,
        email,
        factory,
      });
    } catch (error) {
      alert(error);
      if (error === null) {
        console.log("null을 디폴트로 처리");
      }
    }
  };

  // input값 가져오기
  const handleChange = (e) => {
    setInputInfo({
      [e.target.id]: e.target.value,
    });
  };

  // 연락처 중복체크
  const checkPhone = async () => {
    try {
      const phone = inputInfo.phone;
      const response = await axios.get("/employee/phoneCheck", {
        params: {
          phone,
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

  // 백에 수정사항 보내기
  const putData = async () => {
    try {
      const user_pwd = inputInfo.user_pwd;
      const phone = inputInfo.phone;
      const response = await axios.put("/employee/update?:id", {
        phone,
        user_pwd,
      });
      if (touchPW === true) {
        setModalContent(null);
      } else {
        setModalContent(null);
      }
    } catch (error) {
      if (touchPW === true) {
        setModalContent(null);
      } else {
        setModalContent(null);
      }
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalContent(null);
  };

  // 렌더링 될 때 마다 실행
  // useEffect(() => {
  //   getData();
  // }, [modalContent]);

  return (
    <>
      <s.사원증>
        <s.이름>{userInfo.employee_name}</s.이름>
        <s.사원사진 />
        <s.인적사항>{userInfo.employee_num}</s.인적사항>
        <s.소속>
          <s.인적사항>{userInfo.department}</s.인적사항>
          <s.인적사항>{userInfo.rank}</s.인적사항>
        </s.소속>
        <s.인적사항>{userInfo.factory}</s.인적사항>
        <s.인적사항>{userInfo.email}</s.인적사항>
        {/* <FormControl variant="standard" sx={{ minWidth: 120 }} fullWidth>
          <InputLabel id="departments-select-label">부서 *</InputLabel>
          <Controller
            name="department"
            control={props.control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} error={!!props.errors.department}>
                <MenuItem value="">
                  <em>선택</em>
                </MenuItem>
                {DEPARTMENTS.map((department, idx) => (
                  <MenuItem key={idx} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {props.errors.department ? (
            <FormHelperText error>
              {props.errors.department.message}
            </FormHelperText>
          ) : (
            <FormHelperText sx={{ mb: 2 }}></FormHelperText>
          )}
        </FormControl> */}
        <s.변경사항>
          <s.PW
            id="pw"
            type="text"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => {
              handleChange(e);
              setTouchPW(true);
            }}
          />
        </s.변경사항>
        <s.변경사항 onSubmit={checkPhone}>
          <s.변경인적사항
            id="phone"
            type="text"
            value={userInfo.phone}
            onChange={handleChange}
          />
          <s.변경버튼 type="submit">중복</s.변경버튼>
        </s.변경사항>
        <s.저장버튼 onClick={putData}>저장</s.저장버튼>
      </s.사원증>
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
    </>
  );
}
