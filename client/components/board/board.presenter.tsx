"use client";

import * as s from "@/components/board/board.styles";
import Dashboard from "../chart/Dashboard";
import LoadingComponent from "@/components/layout/Loading";

export default function BoardUI(props: any) {
  // if (props.isLoading1 || props.isLoading2) {
  if (props.isLoading1) {
    return <LoadingComponent />;
  }

  return (
    <s.Wrapper>
      {/* <>{props.idFromPath}</> */}
      <s.BoardTop>
        <h1>대시보드</h1>
        <div>
          {`${props.dateTime}: ${props.year}년 ${props.month}월 ${props.day}일 ${props.hours}시 ${props.minutes}분`}
        </div>
      </s.BoardTop>
      <Dashboard />
    </s.Wrapper>
  );
}
