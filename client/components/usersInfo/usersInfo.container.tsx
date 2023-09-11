"use client";

import UsersInfoUI from "@/components/usersInfo/usersInfo.presenter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsers } from "@/components/utils/userAPI";

export default function UsersInfoContainer() {
  const [usersData, setUsersData] = useState(null);
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

  useEffect(() => {
    async function fetchUsersData() {
      const data = await getUsers();
      setUsersData(data);
    }
    fetchUsersData();
  }, []);

  const handleEdit = (user: any) => {
    setEditing(user.employee_num);
    setTempData(user);
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const handleSave = () => {
    // tempData를 서버로 보내거나 Redux store에 저장
    // ...
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
      />
    </>
  );
}
