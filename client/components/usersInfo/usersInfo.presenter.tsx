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
        <Button
          variant="contained"
          // color="secondary"
          onClick={props.onClickMoveJoin}
        >
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
                // <StyledTableRow key={user.employee_num}>
                <StyledTableRow key={idx}>
                  {props.isEditing && props.editing === user.employee_num ? (
                    <>
                      <StyledTableCell align="center">
                        {user.employee_num}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <input
                          value={props.tempData?.employee_name}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              employee_name: e.target.value,
                            })
                          }
                        /> */}
                        {user.employee_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.department}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              department: e.target.value,
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
                              rank: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <input
                          value={props.tempData?.factory}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              factory: e.target.value,
                            })
                          }
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <input
                          value={props.tempData?.phone}
                          onChange={(e) =>
                            props.setTempData({
                              ...props.tempData,
                              phone: e.target.value,
                            })
                          }
                        /> */}
                        {user.phone}
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
                              admin_ok: e.target.value,
                            })
                          }
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
                            onClick={() => props.handleEdit(user)}
                          >
                            저장
                          </Button>
                          {/* <button onClick={props.handleDelete}>삭제</button> */}
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
                        {user.admin_ok}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          // color="secondary"
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
