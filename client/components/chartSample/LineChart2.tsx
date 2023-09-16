import { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import Moment from "moment";
import "chartjs-adapter-moment"; // Moment.js adapter

Moment.locale("en"); // 로케일 설정

const DATE_FORMAT = "MMM DD";

export function extractDateTime(dateObj: any) {
  const dateMoment = Moment(dateObj);
  const formattedDate = dateMoment.format(DATE_FORMAT);
  return formattedDate;
}

const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

function LineChart() {
  const chartRef = useRef(null);
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic);

  const [chartData, setChartData] = useState(getInitialData());

  const options = getChartOptions();

  useEffect(() => {
    if (!isLoading) {
      const newLabelItem = findLabelItem(plcData, "0");
      const newLabelItem43 = findLabelItem(plcData, "43");
      const newLabelItem44 = findLabelItem(plcData, "44");

      if (newLabelItem && newLabelItem43 && newLabelItem44) {
        updateChartData(
          chartData,
          setChartData,
          newLabelItem,
          newLabelItem43,
          newLabelItem44
        );
      }
    }
  }, [plcData, isLoading]);

  return <Line ref={chartRef} data={chartData} options={options} />;
}

export default LineChart;

// 초기 데이터셋 생성
function getInitialData() {
  return {
    labels: [],
    datasets: [createDataset("", []), createDataset("", [])],
  };
}

// 그래프 데이터셋 생성
function createDataset(label, data) {
  return {
    label,
    data,
    fill: false,
    backgroundColor: "rgb(75,192,192)",
    borderColor: "rgba(75,192,192,0.4)",
  };
}

// MQTT 데이터에서 특정 태그 아이템 찾기
function findLabelItem(data, tagId) {
  return data.find((item) => item.tagId === tagId);
}

// 그래프 옵션 설정
function getChartOptions() {
  return {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: DATE_FORMAT,
          },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
        gridLines: {
          display: false,
        },
      },
    },
  };
}

// 데이터셋 업데이트
function updateChartData(
  chartData,
  setChartData,
  newLabelItem,
  newLabelItem43,
  newLabelItem44
) {
  setChartData((prevData) => {
    const updatedData = { ...prevData };
    const newData43 = parseFloat(newLabelItem43.value);
    const newData44 = parseFloat(newLabelItem44.value);

    updatedData.labels.push(newLabelItem.value);

    updatedData.datasets[0].label = newLabelItem43.name;
    updatedData.datasets[0].data.push(newData43);
    updatedData.datasets[1].label = newLabelItem44.name;
    updatedData.datasets[1].data.push(newData44);

    if (updatedData.labels.length > 50) {
      updatedData.labels.shift();
    }
    if (updatedData.datasets[0].data.length > 50) {
      updatedData.datasets[0].data.shift();
    }
    if (updatedData.datasets[1].data.length > 50) {
      updatedData.datasets[1].data.shift();
    }

    return updatedData;
  });
}
