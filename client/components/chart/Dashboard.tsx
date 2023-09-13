"use client";

import LineChart from "@/components/chart/LineChart";
import BarChart from "@/components/chart/BarChart";
import PieChart from "@/components/chart/PieChart";
import DoughnutChart from "@/components/chart/DoughnutChart";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>대시보드</h1>
      <div style={{ width: "10%", marginBottom: "50px" }}>
        <LineChart />
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "10%" }}>
          <BarChart />
        </div>
        <div style={{ width: "10%" }}>
          <PieChart />
        </div>
      </div>
      <div style={{ width: "10%", marginTop: "50px" }}>
        <DoughnutChart />
      </div>
    </div>
  );
}
