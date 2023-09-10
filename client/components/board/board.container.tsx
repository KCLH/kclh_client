"use client";

import BoardUI from "@/components/board/board.presenter";

export default function BoardContainer(props: any) {
  return (
    <BoardUI
      id={props.id}
      pathname={props.pathname}
      idFromPath={props.idFromPath}
    />
  );
}
