"use client";

import UsersInfoUI from "@/components/usersInfo/usersInfo.presenter";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
// import { getUsers } from "@/components/utils/userAPI";
import { API_URL } from "@/components/utils/Token";
import useAxios from "@/components/hooks/useAxios";
import LoadingComponent from "@/components/layout/Loading";

import axios from "axios";
import { Alert } from "@mui/material";
import { IUpdateAdminInput } from "./userInfo.types";

const initialInputs = {
  employee_num: 0,
  department: "",
  rank: "",
  factory: "",
  admin_ok: "",
};

export default function UsersInfoContainer() {
  console.log("UsersInfoContainer rendering");

  const router = useRouter();

  const [editing, setEditing] = useState(0);

  const [tempData, setTempData] = useState({
    employee_num: 0,
    employee_name: "",
    department: "",
    rank: "",
    factory: "",
    phone: "",
    email: "",
    admin_ok: "",
  });

  const [isActive, setIsActive] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [inputsError, setInputsError] = useState(initialInputs);

  const onChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const _inputs = {
      ...inputs,
      [e.target.id]: e.target.value,
    };
    setInputs(_inputs);
    if (e.target.value !== "") {
      setInputsError({
        ...inputsError,
        [e.target.id]: e.target.value,
      });
    }
    if (Object.values(_inputs).every((el) => el)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // useAxios 훅을 사용하여 API 요청을 보내고 결과를 받아옴.
  const [{ data, loading, error }, fetchUsers] = useAxios(
    `${API_URL}/employee/employeeAll`
  );

  // const [updateState, updateData] = useAxios(`${API_URL}/adminUpdate`, "put");

  const [deleteState, deleteData] = useAxios(
    `${API_URL}/adminDelete`,
    "delete" // 가정: adminDelete는 서버에서 삭제를 처리하는 엔드포인트입니다.
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  // 서버로부터 받아온 데이터를 usersData 상태에 저장.
  const usersData = data;

  const handleEdit = (user: any) => {
    setEditing(user.employee_num);
    setTempData(user);
  };

  const onClickUpdate = async () => {
    if (
      !inputs.department &&
      !inputs.rank &&
      !inputs.factory &&
      !inputs.admin_ok
    ) {
      <Alert severity="error">수정한 내용이 없습니다.</Alert>;
    }

    const updateAdminInput: IUpdateAdminInput = {};

    updateAdminInput.employee_num = editing;

    // department 필드 처리
    updateAdminInput.department = inputs.department || tempData.department;

    // rank 필드 처리
    updateAdminInput.rank = inputs.rank || tempData.rank;

    // factory 필드 처리
    updateAdminInput.factory = inputs.factory || tempData.factory;

    // admin_ok 필드 처리
    updateAdminInput.admin_ok = inputs.admin_ok || tempData.admin_ok;

    try {
      const url = `${API_URL}/employee/adminUpdate${editing}`;
      const updatedData = {
        // ...inputs,
        ...updateAdminInput,
      };
      const response = await axios.put(url, updatedData);

      if (response.status === 200) {
        fetchUsers();
        setEditing(0);
      } else {
        console.error("Update failed:", response);
      }
    } catch (error) {
      console.error("An error occurred while updating:", error);
    }
  };

  // const handleInputChange = (field: any) => (e: any) => {
  //   setTempData((prevTempData) => ({
  //     ...prevTempData,
  //     [field]: e.target.value,
  //   }));
  // };

  const handleCancel = () => {
    setEditing(0);
  };

  // const handleSave = async () => {
  //   try {
  //     // PUT 요청을 보낼 URL과 데이터를 설정합니다.
  //     const url = `${API_URL}/employee/adminUpdate/`;
  //     const data = {
  //       employee_num: tempData.employee_num, // 해당 필드를 채워서 보내기.
  //     };

  //     // PUT 요청을 보내고 응답을 받기.
  //     const response = await axios.put(url, data);

  //     // 성공적으로 응답을 받았다면 사용자 목록을 다시 불러옵기.
  //     if (response.status === 200) {
  //       fetchUsers();
  //       setEditing(null);
  //     } else {
  //       console.error("Update failed:", response);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while updating:", error);
  //   }
  // };

  // const handleSave = async () => {
  //   try {
  //     // PUT 요청을 보낼 URL을 설정합니다.
  //     const url = `${API_URL}/employee/adminUpdate/`;
  //     // 수정된 모든 필드를 tempData에서 가져옵니다.
  //     const updatedData = {
  //       employee_num: tempData.employee_num,
  //       employee_name: tempData.employee_name,
  //       department: tempData.department,
  //       rank: tempData.rank,
  //       factory: tempData.factory,
  //       phone: tempData.phone,
  //       email: tempData.email,
  //       admin_ok: tempData.admin_ok,
  //     };

  //     // PUT 요청을 보내고 응답을 받습니다.
  //     const response = await axios.put(url, updatedData);

  //     // 성공적으로 응답을 받았다면 사용자 목록을 다시 불러옵니다.
  //     if (response.status === 200) {
  //       fetchUsers();
  //       setEditing(null);
  //     } else {
  //       console.error("Update failed:", response);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while updating:", error);
  //   }
  // };

  const handleDelete = async () => {
    // API 요청을 보내서 사용자 정보 삭제
    await deleteData({ employee_num: editing });
    // 삭제가 성공적으로 이루어진 후에는 사용자 목록을 다시 불러와야 할 수도 있습니다.
    if (!deleteState.error) {
      fetchUsers();
    }
    setEditing(0);
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
        handleDelete={handleDelete}
        // handleSave={handleSave}
        // handleInputChange={handleInputChange}
        isActive={isActive}
        inputsError={inputsError}
        onChangeInputs={onChangeInputs}
        onClickUpdate={onClickUpdate}
      />
    </>
  );
}
