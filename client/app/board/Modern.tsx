// pages/index.tsx
"use client";

import React from "react";
import Head from "next/head";
import Dashboard from "./Dashboard";

const Home: React.FC = () => {
  // 데이터 예시
  const sparklineData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
  ];
  const monthlyEarningsData = [
    47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61,
    27, 54, 43, 19, 46,
  ]; // 월별 수익 데이터 예시

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <Dashboard
          sparklineData={sparklineData}
          monthlyEarningsData={monthlyEarningsData}
        />
      </main>
    </div>
  );
};

export default Home;
