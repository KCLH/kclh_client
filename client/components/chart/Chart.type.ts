import { ChartType } from "chart.js";

export interface TableDataItem {
  tagId: number;
  name: string;
  value: number;
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
