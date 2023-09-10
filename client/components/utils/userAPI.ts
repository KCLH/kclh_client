"use client";

import axios from "axios";
import Cookies from "universal-cookie";
import {
  API_URL,
  // headers
} from "@/components/utils/Token";

const getAuthToken = () => {
  const cookies = new Cookies();
  return cookies.get("token");
};

const getHeaders = () => {
  const Token = getAuthToken();
  return {
    Authorization: `Bearer ${Token}`,
  };
};

// export const signUpUser = async (email, password, nick) => {
//   try {
//     const response = await axios.post(`${API_URL}/user/signup`, {
//       email,
//       password,
//       nick,
//     });

//     return response.data;
//   } catch (error) {
//     // throw new Error("회원가입 실패: " + error.response.data);
//     throw new Error(error.response.data.error);
//   }
// };

// export const loginUser = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/user/login`, {
//       email,
//       password,
//     });

//     localStorage.setItem('token', response.data);
//     return response.data;
//   } catch (error) {
//     // throw new Error("로그인 실패: " + error.response.data);
//     throw new Error(error.response.data.error);
//   }
// };

// export const logoutUser = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/user/verify`);
//     const { login } = response.data;
//     if (login) {
//       localStorage.removeItem('token');
//       alert('로그아웃 성공!');
//       return;
//     } else {
//       throw new Error('로그인 상태가 아닙니다. 로그인을 먼저 하세요.');
//     }
//   } catch (error) {
//     // throw new Error("로그아웃 실패: " + error.message);
//     throw new Error(error.response.data.error);
//   }
// };

// export const myInfoFetch = async () => {
//   const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await axios.get(`${API_URL}/user/myinformation`, {
//       headers,
//     });
//     return response.data;
//   } catch (error) {
//     // throw new Error("내 정보를 가져오는데 실패했습니다.");
//     throw new Error(error.response.data.error);
//   }
// };

// export const myPokeFetch = async () => {
//   const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await axios.get(`${API_URL}/myPokemon/mypokemon`, {
//       headers,
//     });
//     return response.data;
//   } catch (error) {
//     // throw new Error("소유한 포켓몬을 가져오는데 실패했습니다.");
//     throw new Error(error.response.data.error);
//   }
// };

// export const myPWchange = async (email, nick, newPassword) => {
//   try {
//     const response = await axios.patch(`${API_URL}/user/myPWchange`, {
//       email,
//       nick,
//       newPassword,
//     });
//     return response.data;
//   } catch (error) {
//     // throw new Error("비밀번호 변경에 실패했습니다.");
//     throw new Error(error.response.data.error);
//   }
// };

//전체 유저
export const getUsers = async () => {
  // const Token = getAuthToken();

  // const headers = {
  //   Authorization: `Bearer ${Token}`,
  // };

  try {
    const response = await axios.get(`${API_URL}/employee/employeeAll`, {
      // headers,
      // withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // throw new Error("포켓몬 데이터를 가져오는데 실패했습니다.");
    // throw new Error(error.response.data.error);
    console.error(error);
  }
};
