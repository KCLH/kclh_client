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
} from "@mui/material";
import { useState } from "react";
import { USERS_TABLE } from "@/components/utils/Constant";

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

export default function UsersInfoUI(props: any) {
  // const [editing, setEditing] = useState(null);
  // const [tempData, setTempData] = useState({
  //   employee_num: "",
  //   employee_name: "",
  //   department: "",
  //   rank: "",
  //   phone: "",
  //   email: "",
  //   admin_ok: "",
  // });

  // const handleEdit = (user: any) => {
  //   setEditing(user.employee_num);
  //   setTempData(user);
  // };

  // const handleSave = () => {
  //   // tempData를 서버로 보내거나 Redux store에 저장
  //   // ...
  //   setEditing(null);
  // };

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
              {USERS_TABLE.map((table) => (
                <StyledTableCell align="center">{table}</StyledTableCell>
              ))}
              <StyledTableCell align="center">수정</StyledTableCell>
            </TableRow>
          </TableHead>

          {props.usersData && (
            <TableBody>
              {props.usersData.map((user: any) => (
                <StyledTableRow key={user.employee_num}>
                  {props.editing === user.employee_num ? (
                    <>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.employee_num}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_num: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.employee_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.department}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_name: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.rank}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_name: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.phone}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_name: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.admin_ok}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_name: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button onClick={() => props.handleEdit(user)}>
                          수정
                        </button>
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
                        {user.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {user.admin_ok}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <button onClick={() => props.handleEdit(user)}>
                          수정
                        </button>
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
