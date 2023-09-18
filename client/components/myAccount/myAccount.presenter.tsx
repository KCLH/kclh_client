"use client";

import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as s from "@/components/myAccount/myAccount.styles";

export default function MyAccountUI({ userInfo }: any) {
  return (
    <>
      <s.사원증>
        <s.이름>{userInfo?.employee_name}</s.이름>
        <s.사원사진 />
        <s.인적사항>{userInfo?.employee_num}</s.인적사항>
        <s.소속>
          <s.인적사항>{userInfo?.department}</s.인적사항>
          <s.인적사항>{userInfo?.rank}</s.인적사항>
        </s.소속>
        <s.인적사항>{userInfo?.factory}</s.인적사항>
        <s.인적사항>{userInfo?.email}</s.인적사항>
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
        {/* <s.변경사항>
          <s.PW
            id="pw"
            type="text"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => {
              props.handleChange(e);
              props.setTouchPW(true);
            }}
          />
        </s.변경사항>
        <s.변경사항 onSubmit={props.checkPhone()}>
          <s.변경인적사항
            id="phone"
            type="text"
            placeholder={props.userInfo.phone}
            onChange={props.handleChange()}
          />
          <s.변경버튼 type="submit">중복</s.변경버튼>
        </s.변경사항>
        <s.저장버튼 onClick={props.putData()}>저장</s.저장버튼> */}
      </s.사원증>
      {/* {modalContent && (
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
