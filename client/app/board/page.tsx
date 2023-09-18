// import PlaygroundPage from "./bo";
"use client";

import LineChart from "./LineChart";
import MultipleRadialbars from "./MultipleRadialbars";
import SemiCircleGauge from "./SemiCircleGauge";
import Stepline from "./Stepline";
import * as s from "./board.styled";
// import Home from "./Modern";

export default function AdminPage() {
  // return <PlaygroundPage />;
  return (
    <s.Wrapper>
      {/* <Home /> */}
      <s.ChartTop>
        {/* <LineChart /> */}
        <s.ChartItemWrap>
          <h1>공정 반복</h1>
        </s.ChartItemWrap>
        {/* <MultipleRadialbars /> */}
        <s.ChartItemWrap>
          <h1>주사위 비교 숫자</h1>
        </s.ChartItemWrap>
        <s.ChartItemWrap>
          <SemiCircleGauge />
        </s.ChartItemWrap>
      </s.ChartTop>
      <s.MidGridContainer>
        <s.MidGridItem>
          <Stepline />
        </s.MidGridItem>
        <s.MidGridItem>
          <MultipleRadialbars />
        </s.MidGridItem>
      </s.MidGridContainer>
      {/* <SemiCircleGauge /> */}
      <s.MidGridItem>
        <LineChart />
      </s.MidGridItem>
    </s.Wrapper>
  );
}
