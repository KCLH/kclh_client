import Cookies from "universal-cookie";

export default function fetcher() {
  // try {
  const cookies = new Cookies();

  // console.log("Current token:", cookies.get("token"));
  // console.log("Current employee number:", cookies.get("employee_num"));

  if (
    cookies.get("token") &&
    // cookies.get("name") &&
    cookies.get("employee_num")
  ) {
    return cookies.get("employee_num");
  }
  // } catch (error) {
  //   console.error("Error reading cookie:", error);
  // }

  return null;
}
