import { ChartType } from "chart.js";

export interface MqttDataItem {
  tagId: string;
  name: string;
  type: string;
  value: boolean | string;
}

export interface UseChartProps {
  type: ChartType;
  data: any;
  options?: any;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    backgroundColor?: string;
    borderColor?: string;
  }[];
}
