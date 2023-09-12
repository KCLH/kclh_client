"use client";

import { useAuth } from "@/components/hooks/useAuth";
import FactoryContainer from "@/components/factory/factory.container";
import { usePathname, useSearchParams } from "next/navigation";

function FactoryPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const idFromPath = pathname.split("/factory/")[1];
  console.log(idFromPath); // '/board/' 이후의 숫자 출력

  const id = searchParams.get("id");

  return (
    <FactoryContainer pathname={pathname} id={id} idFromPath={idFromPath} />
  );
}
export default useAuth(FactoryPage);
