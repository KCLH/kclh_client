import React, { useEffect, useRef } from "react";
import { useChart } from "@/components/hooks/useChart";

interface PieChartProps {
  mqttData: any; // MQTT 데이터의 타입에 따라 수정
}

function PieChart({ mqttData }: PieChartProps) {
  const [pieChartRef, pieChart] = useChart({
    type: "pie",
    data: createPieConfig(mqttData),
  });

  useEffect(() => {
    if (pieChart) {
      pieChart.data = createPieConfig(mqttData).data;
      pieChart.update();
    }
  }, [mqttData, pieChart]);

  return <canvas ref={pieChartRef} />;
}

function createPieConfig(data: any) {
  // MQTT 데이터를 기반으로 차트 데이터를 생성하는 로직
}

export default PieChart;
