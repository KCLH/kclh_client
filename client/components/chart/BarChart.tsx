import React, { useEffect, useRef } from "react";
import { useChart } from "@/components/hooks/useChart";

interface BarChartProps {
  mqttData: any; // MQTT 데이터의 타입에 따라 수정
}

function BarChart({ mqttData }: BarChartProps) {
  const [barChartRef, barChart] = useChart({
    type: "bar",
    data: createBarConfig(mqttData),
  });

  useEffect(() => {
    if (barChart) {
      barChart.data = createBarConfig(mqttData).data;
      barChart.update();
    }
  }, [mqttData, barChart]);

  return <canvas ref={barChartRef} />;
}

function createBarConfig(data: any) {
  // MQTT 데이터를 기반으로 차트 데이터를 생성하는 로직
}

export default BarChart;
