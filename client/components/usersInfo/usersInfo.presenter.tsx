import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { USERS_TABLE } from "@/components/utils/constants";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UsersInfoUI(props: any) {
  console.log("UsersInfoUI rendering");

  console.log(props.usersData);

  return (
    <Wrapper>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5",
        }}
      >
        <h1>사원 전체 정보 관리 페이지</h1>
        <Button variant="contained" onClick={props.onClickMoveJoin}>
          사원 등록
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {USERS_TABLE.map((table, idx) => (
                <StyledTableCell key={idx} align="center">
                  {table}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">수정</StyledTableCell>
            </TableRow>
          </TableHead>

          {props.usersData && (
            <TableBody>
              {props.usersData.map((user: any, idx: any) => (
                <StyledTableRow key={idx}>
                  {props.isEditing && props.editing === user.employee_num ? (
                    <>
                      <StyledTableCell align="center">
                        {user.employee_num}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.employee_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          id="department"
                          type="text"
                          defaultValue={props.tempData?.department}
                          placeholder={props.tempData?.department}
                          onChange={props.onChangeInputs}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          id="rank"
                          type="text"
                          defaultValue={props.tempData?.rank}
                          placeholder={props.tempData?.rank}
                          onChange={props.onChangeInputs}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          id="factory"
                          type="text"
                          defaultValue={props.tempData?.factory}
                          placeholder={props.tempData?.factory}
                          onChange={props.onChangeInputs}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <input
                          id="admin_ok"
                          type="text"
                          defaultValue={props.tempData?.admin_ok}
                          placeholder={
                            props.tempData?.admin_ok === "Y" ? "관리자" : "사원"
                          }
                          onChange={props.onChangeInputs}
                        /> */}
                        <input
                          id="admin_ok"
                          type="text"
                          // defaultValue={
                          //   props.tempData?.admin_ok === "Y" ? "관리자" : "사원"
                          // }
                          placeholder={
                            props.tempData?.admin_ok === "Y" ? "관리자" : "사원"
                          }
                          onChange={(e) => {
                            const value =
                              e.target.value === "관리자" ? "Y" : "N";
                            props.onChangeInputs({
                              target: { id: "admin_ok", value },
                            });
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={props.handleCancel}
                          >
                            취소
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={props.onClickUpdate}
                          >
                            저장
                          </Button>
                          <IconButton aria-label="delete" size="large">
                            <Delete fontSize="inherit" />
                          </IconButton>
                        </Stack>
                      </StyledTableCell>
                    </>
                  ) : (
                    <>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {user.employee_num}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.employee_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.department}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.rank}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.factory}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.admin_ok === "Y" ? "관리자" : "사원"}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => props.handleEdit(user)}
                        >
                          수정
                        </Button>
                      </StyledTableCell>
                    </>
                  )}
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Wrapper>
  );
}
