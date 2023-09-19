import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMqttClient } from "@/components/hooks/useMqttClient";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// MQTT 브로커 및 토픽 정보
// const brokerUrl = "mqtt://192.168.0.106:8884";
// const topic = "iot1/info";

const TempGauge = ({ brokerUrl, iotTopic }) => {
  const { iotData, isLoading } = useMqttClient(brokerUrl, iotTopic); // MQTT 데이터 가져오기
  const [mqttData, setMqttData] = useState(null); // MQTT 데이터 저장

  // useEffect(() => {
  //   // 데이터가 로드되면 실행되는 효과를 정의합니다.
  //   if (!isLoading) {
  //     // 필요한 데이터 항목을 가져옵니다.
  //     const temp = iotData.find((item) => item.type === "temp");

  //     // MQTT 데이터를 업데이트합니다.
  //     setMqttData([parseFloat(temp?.value)]);
  //   }
  // }, [iotData, isLoading]);

  useEffect(() => {
    if (!isLoading && iotData) {
      // 데이터가 로드되고 유효한 경우에만 실행
      const temp = iotData.find((item) => item.type === "temp");

      if (temp) {
        // 유효한 온도 데이터가 있을 때만 설정
        setMqttData([parseFloat(temp.value)]);
      }
    }
  }, [iotData, isLoading]);

  const getColorForValue = (value) => {
    if (value >= 0 && value <= 20) {
      return "#3F51B5";
    } else if (value >= 21 && value <= 40) {
      return "#2983FF";
    } else if (value >= 41 && value <= 60) {
      return "#4CAF50";
    } else if (value >= 61 && value <= 80) {
      return "#F9C80E";
    } else {
      return "#F86624";
    }
  };

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
            formatter: function (value) {
              return value + "°C"; // °C로 값 포맷 변경
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "linear",
      colors: [getColorForValue(mqttData)],
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["온도"],
  };

  return (
    <div id="chart">
      <h3 style={{ marginLeft: "20px" }}>온도</h3>
      {mqttData !== null && mqttData.length > 0 ? (
        <ReactApexChart options={options} series={mqttData} type="radialBar" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TempGauge;
