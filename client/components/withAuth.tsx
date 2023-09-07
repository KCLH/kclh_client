"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

export function withAuth(WrappedComponent: any) {
  return (props: any) => {
    const Router = useRouter();
    const token = Cookies.get("token");

    useEffect(() => {
      if (!token) {
        Router.replace("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
