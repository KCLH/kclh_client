import { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import Moment from "moment";
import "chartjs-adapter-moment"; // Moment.js adapter

Moment.locale("en"); // 로케일 설정
// DATE_FORMAT과 extractDateTime 함수는 그대로 유지
const DATE_FORMAT = "MMM DD";

// extractDateTime 함수는 Moment.js를 사용하여 날짜를 원하는 형식으로 포맷합니다.
export function extractDateTime(dateObj: any) {
  const dateMoment = Moment(dateObj);
  const formattedDate = dateMoment.format(DATE_FORMAT);
  return formattedDate;
}

// MQTT 브로커 및 주제 설정
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

// LineChart 컴포넌트 시작
function LineChart() {
  const chartRef = useRef(null);

  // useMqttClient 커스텀 훅을 사용하여 MQTT 데이터 및 로딩 상태 가져오기
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  // 초기 데이터셋 생성
  const initialData = {
    labels: [], // 그래프의 x 축 레이블
    datasets: [
      {
        label: "",
        data: [], // 초기에 빈 배열
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "",
        data: [], // 초기에 빈 배열
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  const [chartData, setChartData] = useState(initialData);

  // 그래프 옵션 설정
  const options = {
    scales: {
      y: {
        beginAtZero: true, // y 축의 값이 0에서 시작
      },
      x: {
        type: "time", // x 축은 시간 형식
        time: {
          unit: "day", // x 축 레이블을 날짜 형식으로 표시
          displayFormats: {
            day: DATE_FORMAT, // 사용자 정의 날짜 형식 적용
          },
        },
        ticks: {
          autoSkip: true, // 자동으로 x 축 레이블을 조절
          maxTicksLimit: 20, // 표시되는 레이블 수 제한
        },
        gridLines: {
          display: false, // 그리드 라인 숨김
        },
      },
    },
  };

  useEffect(() => {
    if (!isLoading) {
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const newLabelItem43 = plcData.find((item) => item.tagId === "43");
      const newLabelItem44 = plcData.find((item) => item.tagId === "44");

      // MQTT 데이터가 도착한 후에 데이터셋을 업데이트
      if (newLabelItem && newLabelItem43 && newLabelItem44) {
        setChartData({
          labels: [...chartData.labels, newLabelItem.value],
          datasets: [
            {
              label: newLabelItem43.name,
              data: [
                ...chartData.datasets[0].data,
                parseFloat(newLabelItem43.value),
              ],
              fill: false,
              backgroundColor: "rgb(75,192,192)",
              borderColor: "rgba(75,192,192,0.4)",
            },
            {
              label: newLabelItem44.name,
              data: [
                ...chartData.datasets[1].data,
                parseFloat(newLabelItem44.value),
              ],
              fill: false,
              backgroundColor: "rgb(75,192,192)",
              borderColor: "rgba(75,192,192,0.4)",
            },
          ],
        });
      }
    }
  }, [plcData, isLoading]);

  // Line 컴포넌트를 사용하여 그래프 출력
  return <Line ref={chartRef} data={chartData} options={options} />;
}

export default LineChart;
