// import PlaygroundPage from "./bo";
"use client";

import LineChart from "./LineChart";
// import PieChart from "./PieChart";
import MultipleRadialbars from "./MultipleRadialbars";
// import MultipleRadialbars from "./MultipleRadialbars copy";
import TempGauge from "./TempGauge";
import Stepline from "./Stepline";
import * as s from "./board.styled";
import HumidGauge from "./HumidGauge";
import PlcDiceValue from "./PlcDiceValue";
import PlcDelay from "./PlcDelay";
import PlcDiceNum from "./PlcDiceNum";
// import LineColumn from "./LineColumn";
// import Home from "./Modern";

export default function AdminPage() {
  // return <PlaygroundPage />;
  return (
    <s.Wrapper>
      {/* <Home /> */}
      <s.ChartTop>
        {/* <LineChart /> */}
        <s.ChartItemWrap>
          {/* <h1>공정 반복</h1> */}
          <PlcDelay />
        </s.ChartItemWrap>
        {/* <MultipleRadialbars /> */}
        <s.ChartItemWrap
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 30px",
          }}
        >
          {/* <h1>주사위 비교 숫자</h1> */}
          <div style={{ width: "40%" }}>
            <PlcDiceValue />
          </div>
          <div style={{ width: "60%" }}>
            <PlcDiceNum />
          </div>
        </s.ChartItemWrap>
        <s.ChartItemWrap>
          <TempGauge />
        </s.ChartItemWrap>
        <s.ChartItemWrap>
          <HumidGauge />
        </s.ChartItemWrap>
      </s.ChartTop>
      <s.MidGridContainer>
        <s.MidGridItem>
          <Stepline />
          {/* <LineColumn /> */}
        </s.MidGridItem>
        <s.MidGridItem>
          <MultipleRadialbars />
          {/* <PieChart /> */}
        </s.MidGridItem>
      </s.MidGridContainer>
      {/* <SemiCircleGauge /> */}
      <s.MidGridItem>
        <LineChart />
      </s.MidGridItem>
    </s.Wrapper>
  );
}
