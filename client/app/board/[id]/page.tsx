export default function Board(props: any) {
  return (
    <>
      <>{props.params.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
      입니다.
    </>
  );
}
