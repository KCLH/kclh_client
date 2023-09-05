export default function BoardPage(props: any) {
  return (
    <>
      <>{props.params.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
      입니다.
    </>
  );
}

// import BoardContainer from "@/components/board/board.container";
// import { useRouter } from "next/router";

// export default function BoardPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   return <BoardContainer id={id} />;
// }
