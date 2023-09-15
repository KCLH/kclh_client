import { useRef, useEffect } from "react";
import { Chart, ChartConfiguration } from "chart.js";
import { UseChartProps } from "../chart/MqttChart.type";

// 차트를 그리는데 필요한 설정을 하는 커스텀 훅.
const useChart = ({ type, data, options }: UseChartProps) => {
  // 차트를 그릴 canvas 요소와 차트 인스턴스에 대한 참조를 생성.
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // 차트의 설정을 정의.
  useEffect(() => {
    if (chartRef.current) {
      const config: ChartConfiguration = {
        type,
        data,
        options,
      };

      // If a chart instance already exists, update its data and redraw it.
      // 이미 차트 인스턴스가 존재한다면 데이터와 옵션을 업데이트하고 다시 그림.
      if (chartInstance.current) {
        chartInstance.current.data = data;
        chartInstance.current.options = options;
        chartInstance.current.update();
      } else {
        // Otherwise create a new instance
        // 존재하지 않는다면 새로운 인스턴스를 생성하고 그림.
        chartInstance.current = new Chart(
          chartRef.current.getContext("2d")!,
          config
        );
      }
    }

    return () => {
      // Cleanup function to destroy the instance when the component unmounts
      // 컴포넌트가 언마운트될 때 혹은 이 effect가 다시 실행되기 전에 기존의 차트 인스턴스를 제거.
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [type, data, options]);

  return { ref: chartRef };
};

export default useChart;
