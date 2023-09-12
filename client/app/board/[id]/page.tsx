"use client";

import { useAuth } from "@/components/hooks/useAuth";
import BoardContainer from "@/components/board/board.container";
import { usePathname, useSearchParams } from "next/navigation";

function BoardPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const idFromPath = pathname.split("/board/")[1];
  console.log(idFromPath); // '/board/' 이후의 숫자 출력

  const id = searchParams.get("id");

  return (
    <>
      <BoardContainer pathname={pathname} id={id} idFromPath={idFromPath} />
    </>
  );
}

// export default useAuth(BoardPage);
export default BoardPage;
