import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: any,
  options?: CookieSetOptions
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
