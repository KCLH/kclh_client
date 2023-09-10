"use client";

import UsersInfoUI from "@/components/usersInfo/usersInfo.presenter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUsers } from "@/components/utils/userAPI";

export default function UsersInfoContainer() {
  const [usersData, setUsersData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUsersData() {
      const data = await getUsers();
      setUsersData(data);
    }
    fetchUsersData();
  }, []);

  const onClickMoveJoin = async () => {
    try {
      router.push("/admin/signup");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UsersInfoUI onClickMoveJoin={onClickMoveJoin} usersData={usersData} />
    </>
  );
}
