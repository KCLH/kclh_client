"use client";

import Cookies from "universal-cookie";

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

const API_URL = process.env.NEXT_PUBLIC_SERVER;

export { API_URL, getHeaders, getAuthToken };
