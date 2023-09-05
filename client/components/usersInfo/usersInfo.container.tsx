"use client";

import UsersInfoUI from "@/components/usersInfo/usersInfo.presenter";
import { useRouter } from "next/navigation";

export default function UsersInfoContainer() {
  const router = useRouter();

  const onClickMoveJoin = async () => {
    try {
      router.push("/admin/signup");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UsersInfoUI onClickMoveJoin={onClickMoveJoin} />
    </>
  );
}
