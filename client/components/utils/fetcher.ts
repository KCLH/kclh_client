import Cookies from "universal-cookie";

const fetcher = () => {
  const cookies = new Cookies();
  if (
    cookies.get("token") &&
    // cookies.get("name") &&
    cookies.get("employee_num")
  ) {
    return cookies.get("employee_num");
  }

  return null;
};

export default fetcher;
