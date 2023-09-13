interface TableDataItem {
  tagId: string;
  name: string;
  value: number;
}

// export function createChartData(tableData: TableDataItem[]) {
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
export function createChartData(
  tableData: TableDataItem[],
  filterFunc: (item: TableDataItem) => boolean
) {
  const filteredData = tableData.filter(filterFunc);

  const data = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        label: "# of Votes",
        data: filteredData.map((item) => item.value),
        fill: false,
        backgroundColor: "rgb(75,192,192)",
        borderColor: "rgba(75,192,192 ,0.4)",
      },
    ],
  };

  return data;
}
