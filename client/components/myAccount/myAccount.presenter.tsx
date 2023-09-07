"use client";
import * as s from "@/components/myAccount/myAccount.styles";

export default function MyAccountUI(props: any) {
  return (
    <>
      {/* <s.사원증>
        <s.이름>{userInfo.employee_name}</s.이름>
        <s.사원사진 src="" />
        <s.인적사항>{userInfo.employee_num}</s.인적사항>
        <s.소속>
          <s.인적사항>{userInfo.department}</s.인적사항>
          <s.인적사항>{userInfo.rank}</s.인적사항>
        </s.소속>
        <s.PW
          id="pw"
          type="text"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            handleChange(e);
            setTouchPW(true);
          }}
        />
        <s.변경사항 onSubmit={checkPhone}>
          <s.변경인적사항
            id="phone"
            type="text"
            value={userInfo.phone}
            onChange={handleChange}
          />
          <s.변경버튼 type="submit">중복</s.변경버튼>
        </s.변경사항>
        <s.변경사항 onSubmit={checkEmail}>
          <s.변경인적사항
            id="email"
            type="text"
            value={userInfo.email}
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
      )} */}
    </>
  );
}
