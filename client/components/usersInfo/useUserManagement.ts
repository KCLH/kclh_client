// import useSWR from "swr";
// import fetcher from "@/components/utils/fetcher";
import useAxios from "@/components/hooks/useAxios";
import { API_URL } from "@/components/utils/Token";
import { useState } from "react";

export function useUserManagement() {
  // const {
  //   data: usersData,
  //   error: usersError,
  //   mutate: mutateUsers,
  // } = useSWR("currentUser", fetcher);

  // 나머지 상태 및 함수들은 그대로 유지
  const [editing, setEditing] = useState(null);
  const [tempData, setTempData] = useState({
    employee_num: "",
    employee_name: "",
    department: "",
    rank: "",
    factory: "",
    phone: "",
    email: "",
    admin_ok: "",
  });

  // useAxios를 사용하여 데이터 가져오기
  const [userDataState, fetchUserData] = useAxios("currentUser", "get");

  // useAxios를 컴포넌트 외부에서 호출하여 업데이트 및 삭제 요청 보내기
  const [, saveUserData] = useAxios(`${API_URL}/employee/update`, "put");
  const [, deleteUserData] = useAxios(
    `${API_URL}/employee/delete/${tempData.employee_num}`,
    "delete"
  );

  const handleSave = async () => {
    try {
      // 업데이트할 데이터 준비
      const updatedUserData = {
        employee_num: tempData.employee_num,
        employee_name: tempData.employee_name,
        department: tempData.department,
        rank: tempData.rank,
        factory: tempData.factory,
        phone: tempData.phone,
        email: tempData.email,
        admin_ok: tempData.admin_ok,
      };
      // useAxios를 사용하여 업데이트 요청 보내기
      await saveUserData(updatedUserData);

      // 다시 데이터를 가져와서 화면 갱신
      await fetchUserData();
      setEditing(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // useAxios를 사용하여 삭제 요청 보내기
      await deleteUserData();

      // 데이터 업데이트 및 삭제 모드 종료 등 필요한 작업 수행
      // ...

      // 다시 데이터를 가져와서 화면 갱신
      await fetchUserData();
      setEditing(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return {
    userData: userDataState.data,
    loading: userDataState.loading,
    error: userDataState.error,
    editing,
    tempData,
    handleSave,
    handleDelete,
  };
}
