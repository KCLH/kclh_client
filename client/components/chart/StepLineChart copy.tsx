import "chart.js/auto";
import { Line } from "react-chartjs-2";

const SteppedLineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Stepped Line Chart",
        data: [10, 12, 8, 15, 7, 9, 11],
        borderColor: "",
        backgroundColor: "",
        stepped: "before", // Stepped Line을 만들기 위한 옵션
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {/* <h1>Stepped Line Chart Example</h1> */}
      <Line data={data} options={options} />
    </div>
  );
};

export default SteppedLineChart;
