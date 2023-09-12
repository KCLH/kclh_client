"use client";

// import LineChart from "@/components/chart/LineChart";
// import BarChart from "@/components/chart/BarChart";
// import PieChart from "@/components/chart/PieChart";
// import DoughnutChart from "@/components/chart/DoughnutChart";
import * as s from "@/components/board/board.styles";
import Dashboard from "../chart/Dashboard";

export default function BoardUI(props: any) {
  // console.log(props);

  return (
    <s.Wrapper>
      {/* <>{props.idFromPath}</> */}
      <s.BoardTop>
        <h1>대시보드</h1>
        <div>{}데이터 전송 시간</div>
      </s.BoardTop>
      {/* <div className="mt-5">
        <Bar
          data={{
            labels: tableData.map((item) => item.name),
            datasets: [
              {
                label: "Value",
                data: tableData.map((item) => item.value),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div> */}
      {/* <LineChart />
      <BarChart />
      <PieChart />
      <DoughnutChart /> */}
      <Dashboard />
    </s.Wrapper>
  );
}
