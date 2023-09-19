"use client";
// https://apexcharts.com/docs/options/theme/
// 차트 색상 참고

import * as s from "@/components/board/board.styles";
import * as c from "@/components/board/Chart.styled";
import LoadingComponent from "@/components/layout/Loading";
import PlcDelay from "@/components/chart/PlcDelay";
import PlcDiceValue from "@/components/chart/PlcDiceValue";
import PlcDiceNum from "@/components/chart/PlcDiceNum";
import TempGauge from "@/components/chart/TempGauge";
import HumidGauge from "@/components/chart/HumidGauge";
import Stepline from "@/components/chart/Stepline";
import MultipleRadialbars from "@/components/chart/MultipleRadialbars";
import LineChart from "@/components/chart/LineChart";

export default function BoardUI(props: any) {
  // if (props.eduKitIsLoading || props.iotIsLoading) {
  console.log(props.eduKitIsLoading);
  if (props.eduKitIsLoading) {
    return <LoadingComponent />;
  }

  return (
    <s.Wrapper>
      <s.BoardTop>
        <h1>{props.idFromPath}공장 대시보드</h1>
        <div>
          {`${props.dateTime}: ${props.year}년 ${props.month}월 ${props.day}일 ${props.hours}시 ${props.minutes}분`}
        </div>
      </s.BoardTop>
      <c.ChartWrapper>
        <c.ChartTop>
          <c.ChartItemWrap>
            <PlcDelay
              brokerUrl={props.brokerUrl}
              eduKitTopic={props.eduKitTopic}
              // idFromPath={props.idFromPath}
            />
          </c.ChartItemWrap>
          <c.ChartItemWrap
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 30px",
            }}
          >
            <div style={{ width: "40%" }}>
              <PlcDiceValue
                brokerUrl={props.brokerUrl}
                eduKitTopic={props.eduKitTopic}
                // idFromPath={props.idFromPath}
              />
            </div>
            <div style={{ width: "60%" }}>
              <PlcDiceNum
                brokerUrl={props.brokerUrl}
                eduKitTopic={props.eduKitTopic}
                // idFromPath={props.idFromPath}
              />
            </div>
          </c.ChartItemWrap>
          <c.ChartItemWrap>
            <TempGauge
              brokerUrl={props.brokerUrl}
              iotTopic={props.iotTopic}
              // idFromPath={props.idFromPath}
            />
          </c.ChartItemWrap>
          <c.ChartItemWrap>
            <HumidGauge
              brokerUrl={props.brokerUrl}
              iotTopic={props.iotTopic}
              // idFromPath={props.idFromPath}
            />
          </c.ChartItemWrap>
        </c.ChartTop>
        <c.MidGridContainer>
          <c.MidGridItem>
            <Stepline
              brokerUrl={props.brokerUrl}
              eduKitTopic={props.eduKitTopic}
              // idFromPath={props.idFromPath}
            />
          </c.MidGridItem>
          <c.MidGridItem>
            <MultipleRadialbars
              brokerUrl={props.brokerUrl}
              eduKitTopic={props.eduKitTopic}
              // idFromPath={props.idFromPath}
            />
          </c.MidGridItem>
        </c.MidGridContainer>
        <c.MidGridItem>
          <LineChart
            brokerUrl={props.brokerUrl}
            eduKitTopic={props.eduKitTopic}
            // idFromPath={props.idFromPath}
          />
        </c.MidGridItem>
      </c.ChartWrapper>
    </s.Wrapper>
  );
}
