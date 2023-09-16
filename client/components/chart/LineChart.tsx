import React, { useEffect } from "react";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import { useChart } from "@/components/hooks/useChart";
import { ChartData } from "chart.js";

interface LineChartProps {
  brokerUrl: string;
  topic: string;
}

function LineChart({ brokerUrl, topic }: LineChartProps) {
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  const [lineChartRef, lineChart] = useChart({
    type: "line",
    data: createLineConfig(plcData),
  });

  useEffect(() => {
    if (lineChart && !isLoading) {
      lineChart.data = createLineConfig(plcData).data;
      lineChart.update();
    }
  }, [plcData, isLoading, lineChart]);

  return <canvas ref={lineChartRef} />;
}

function createLineConfig(data: any[]): ChartData<"line"> {
  // MQTT 데이터를 기반으로 차트 데이터를 생성하는 로직
  const dataTime = data.map((item) => item.value); // X축 데이터 (DataTime)
  const pos1CurSpd = data
    .filter((item) => item.name === "_POS_1_CurSpd")
    .map((item) => item.value); // Y축 데이터 (_POS_1_CurSpd)
  const pos2CurSpd = data
    .filter((item) => item.name === "_POS_2_CurSpd")
    .map((item) => item.value); // Y축 데이터 (_POS_2_CurSpd)

  return {
    labels: dataTime,
    datasets: [
      {
        label: "_POS_1_CurSpd",
        data: pos1CurSpd,
        borderColor: "red",
      },
      {
        label: "_POS_2_CurSpd",
        data: pos2CurSpd,
        borderColor: "blue",
      },
    ],
  };
}

export default LineChart;
