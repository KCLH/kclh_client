// components/Dashboard.tsx
"use client";
import React from "react";
import SparklineChart from "./SparklineChart";
import MonthlyEarningsChart from "./MonthlyEarningsChart";

interface DashboardProps {
  sparklineData: number[];
  monthlyEarningsData: number[];
}

const Dashboard: React.FC<DashboardProps> = ({
  sparklineData,
  monthlyEarningsData,
}) => {
  return (
    <div>
      <SparklineChart data={sparklineData} title="Sales" />
      {/* <SparklineChart data={sparklineData} title="Expenses" />
      <SparklineChart data={sparklineData} title="Profits" /> */}
      <MonthlyEarningsChart data={monthlyEarningsData} />
      {/* 다른 차트 추가 */}
    </div>
  );
};

export default Dashboard;
