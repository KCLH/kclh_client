"use client";

// import { useEffect } from "react";
// import { useMqttClient } from "@/components/hooks/useMqttClient"; //MQTT 클라이언트 관련 로직을 처리하는 커스텀 훅
// import { MyChartData } from "@/components/utils/MyChartData"; // 차트 데이터 생성 함수
import LineChart from "@/components/chart/LineChart";
import PieChart from "@/components/chart/PieChart";
import SteppedLineChart from "@/components/chart/StepLineChart";
// import { MqttDataItem } from "./Chart.type";

export default function Dashboard() {
  // const brokerUrl = "mqtt://192.168.0.106:8884";
  // const topic = "edukit1";

  // useEffect(() => {
  //   if (tableData.length > 0) {
  //     const filterFunc = (item: any) => true; // 모든 데이터 선택 (실제 필터링 조건으로 변경하세요.)
  //     const chartData = MyChartData(tableData, filterFunc);
  //     console.log(chartData);
  //   }
  // }, [tableData]);

  // const MqttData = useMqttClient(brokerUrl, topic);

  // const filterFunc = (item: MqttDataItem) => item.value > 50; // value가 50보다 큰 데이터만 선택
  // const data = MyChartData(tableData, filterFunc);

  // const data = MyChartData(tableData);

  // const data = MyChartData;
  // MyChartData 함수 호출
  // const data = MyChartData(exampleTableData, exampleFilterFunc);
  // console.log("MqttData:", MqttData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}></div>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
          backgroundColor: "azure",
        }}
      >
        <div style={{ backgroundColor: "beige" }}>
          <LineChart />
        </div>
        <div style={{ backgroundColor: "coral" }}>
          <PieChart />
        </div>
        <div style={{ backgroundColor: "aqua" }}>
          <SteppedLineChart />
        </div>
      </div>
    </div>
  );
}
