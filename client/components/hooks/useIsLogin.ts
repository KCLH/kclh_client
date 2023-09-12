import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function isLogin() {
  const getCookie = cookies.get("token");
  if (!!getCookie === true) {
    // token이 빈 값이 아니라면
    axios.defaults.headers.common.Authorization = `Bearer ${getCookie}`;
    return true;
  }
  return false;
}
