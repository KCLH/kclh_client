"use client";

import LineChart from "@/components/chartSample/LineChart";
import PieChart from "@/components/chartSample/PieChart2";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%" }}></div>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
          backgroundColor: "azure",
        }}
      >
        <div style={{ backgroundColor: "beige" }}>
          <LineChart />
        </div>
        <div style={{ backgroundColor: "coral" }}>{/* <PieChart /> */}</div>
      </div>
    </div>
  );
}
