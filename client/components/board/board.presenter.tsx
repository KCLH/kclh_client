"use client";

export default function BoardUI(props: any) {
  return (
    <>
      <>{props.props.params.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
    </>
  );
}
