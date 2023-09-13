// export function ChartData(tableData: TableDataItem[]) {
//   const data = {
//     labels: tableData.map((item) => item.name),
//     datasets: [
//       {
//         label: "# of Votes",
//         data: tableData.map((item) => item.value),
//         fill: false,
//         backgroundColor: "rgb(75,192,192)",
//         borderColor: "rgba(75,192,192 ,0.4)",
//       },
//     ],
//   };
//   return data;
// }
import { TableDataItem } from "@/components/chart/Chart.type";

// 테이블 데이터를 필터링하여 차트 데이터로 변환하는 함수.
export function MyChartData(
  tableData: TableDataItem[],
  filterFunc: (item: TableDataItem) => boolean
) {
  // filterFunc에 따라 필요한 데이터만 선택하여 새 배열을 만듦.
  const filteredData = tableData.filter(filterFunc);

  const data = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        data: filteredData.map((item) => item.value),
        fill: false,
      },
    ],
  };

  return data;
}
