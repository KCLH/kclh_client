import { useEffect, useRef, useState } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import "chartjs-adapter-moment";
import Moment from "moment";
import "moment/locale/ko";

Moment.locale("ko");

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

  const chartDataTemplate = {
    label: "",
    data: [],
    fill: false,
    backgroundColor: "",
    borderColor: "",
  };

  const initialData = {
    labels: [],
    datasets: [chartDataTemplate, chartDataTemplate],
  };

  const [chartData, setChartData] = useState(initialData);

  const options = {
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

  useEffect(() => {
    if (!isLoading) {
      const newLabelItem = plcData.find((item) => item.tagId === "0");
      const _3호기1축속도 = plcData.find((item) => item.tagId === "43");
      const _3호기2축속도 = plcData.find((item) => item.tagId === "44");

      if (newLabelItem && _3호기1축속도 && _3호기2축속도) {
        const newLabels = [...chartData.labels, newLabelItem.value];
        const _3호기1축 = [
          ...chartData.datasets[0].data,
          parseFloat(_3호기1축속도.value),
        ];
        const _3호기2축 = [
          ...chartData.datasets[1].data,
          parseFloat(_3호기2축속도.value),
        ];

        // 데이터 개수가 20개를 초과하는 경우 맨 앞의 데이터를 제거
        if (newLabels.length > 20) {
          newLabels.shift();
          _3호기1축.shift();
          _3호기2축.shift();
        }

        setChartData({
          labels: newLabels,
          datasets: [
            {
              label: _3호기1축속도.name,
              data: _3호기1축,
              fill: false,
              backgroundColor: "",
              borderColor: "",
            },
            {
              label: _3호기2축속도.name,
              data: _3호기2축,
              fill: false,
              backgroundColor: "",
              borderColor: "",
            },
          ],
        });
      }
    }
  }, [plcData, isLoading]);

  return <Line ref={chartRef} data={chartData} options={options} />;
}

export default LineChart;
