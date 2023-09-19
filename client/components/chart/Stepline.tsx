import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// MQTT 브로커 및 토픽 정보
// const brokerUrl = "mqtt://192.168.0.106:8884";
// const topic = "edukit1";

const Stepline = ({ brokerUrl, eduKitTopic }) => {
  const [mqttData, setMqttData] = useState([]); // MQTT 데이터 저장
  const { plcData, isLoading } = useMqttClient(brokerUrl, eduKitTopic); // MQTT 데이터 가져오기

  useEffect(() => {
    // 데이터가 로드되면 실행되는 효과를 정의합니다.
    if (!isLoading) {
      // 필요한 데이터 항목을 가져옵니다.
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const diceValue = plcData.find((item) => item.tagId === "37");
      const diceComparisonValue = plcData.find((item) => item.tagId === "38"); // 새로운 데이터

      // MQTT 데이터를 업데이트합니다.
      setMqttData((prevData) => [
        ...prevData,
        {
          label: newLabelItem.value,
          value: parseFloat(diceValue.value),
          additionalValue: parseFloat(diceComparisonValue.value), // 새로운 데이터 추가
        },
      ]);
    }
  }, [plcData, isLoading]);

  const seriesData = [
    {
      name: "주사위 값",
      data: mqttData.map((item) => item.value),
      color: "#FA4443",
    },
    {
      name: "주사위 비교 숫자",
      data: mqttData.map((item) => item.additionalValue),
      color: "#2983FF",
    },
  ];

  // LineChart와 동일한 x축 설정
  const options = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000, // 원하는 속도로 조절 가능
        },
      },
    },
    stroke: {
      curve: "stepline",
    },
    colors: ["tomato", "royalblue"],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "주사위 값",
      align: "left",
    },
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
    xaxis: {
      type: "datetime",
      categories: mqttData.map((item) => item.label),
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={seriesData}
        type="line"
        height={350}
      />
    </div>
  );
};

export default Stepline;
