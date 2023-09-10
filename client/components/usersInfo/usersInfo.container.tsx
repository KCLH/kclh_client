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

  const handleSave = () => {
    // tempData를 서버로 보내거나 Redux store에 저장
    // ...
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
        tempData={tempData}
        handleEdit={handleEdit}
        handleSave={handleSave}
      />
    </>
  );
}
