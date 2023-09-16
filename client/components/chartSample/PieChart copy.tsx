import "chart.js/auto";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgb(255 ,99 ,132)",
        "rgb(54 ,162 ,235)",
        "rgb(255 ,205 ,86)",
      ],
    },
  ],
};

function PieChart() {
  return <Pie data={data} />;
}

export default PieChart;
