"use client";

import UsersInfoUI from "@/components/usersInfo/usersInfo.presenter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { getUsers } from "@/components/utils/userAPI";
import { API_URL } from "@/components/utils/Token";
import useAxios from "@/components/hooks/useAxios";
import LoadingComponent from "@/components/layout/Loading";

export default function UsersInfoContainer() {
  const router = useRouter();

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

  // useAxios 훅을 사용하여 API 요청을 보내고 결과를 받아옴.
  const [{ data, loading, error }, fetchUsers] = useAxios(
    `${API_URL}/employee/employeeAll`
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  // const [usersData, setUsersData] = useState([]);

  // useEffect(() => {
  //   async function fetchUsersData() {
  //     const data = await getUsers();
  //     setUsersData(data);
  //   }
  //   fetchUsersData();
  // }, []);

  // 서버로부터 받아온 데이터를 usersData 상태에 저장.
  const usersData = data;

  const handleEdit = (user: any) => {
    setEditing(user.employee_num);
    setTempData(user);
  };

  const handleInputChange = (field: any) => (e: any) => {
    setTempData((prevTempData) => ({
      ...prevTempData,
      [field]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleSave = () => {
    // tempData를 서버로 보내거나 Redux store에 저장
    // const updatedUser = props.tempData; // 예시

    // API 요청을 보내서 사용자 정보 업데이트
    // await updateUser(updatedUser); // 예시

    setEditing(null);
  };

  const handleDelete = () => {
    setEditing(null);
  };

  const onClickMoveJoin = async () => {
    try {
      router.push("/admin/signup");
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <LoadingComponent />;

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <UsersInfoUI
        onClickMoveJoin={onClickMoveJoin}
        usersData={usersData}
        editing={editing}
        isEditing={editing !== null} // 'isEditing' prop은 'editing'이 null이 아니라면 true, null이라면 false.
        tempData={tempData}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleDelete={handleDelete}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
