import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "universal-cookie";

export function useAuth(WrappedComponent: any) {
  return (props: any) => {
    const cookies = new Cookies();
    const Router = useRouter();
    const Token = cookies.get("token");

    useEffect(() => {
      if (!Token) {
        Router.replace("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
