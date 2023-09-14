"use client";

// import LineChart from "@/components/chart/LineChart";
// import BarChart from "@/components/chart/BarChart";
// import PieChart from "@/components/chart/PieChart";
// import DoughnutChart from "@/components/chart/DoughnutChart";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import * as s from "@/components/board/board.styles";
import Dashboard from "../chart/Dashboard";

export default function BoardUI(props: any) {
  // console.log(props);
  const brokerUrl = "mqtt://192.168.0.106:8884";
  const topic = "edukit1";

  const MqttData = useMqttClient(brokerUrl, topic);

  // console.log(typeof MqttData[0].tagId); // 아놔 스트링이었네 넘번 줄 어쩐지 안되더라

  let year, month, day, hours, minutes;

  // tagId가 '0'인 항목 찾기
  const dateTimeItem = MqttData.find((item) => item.tagId === "0");

  if (dateTimeItem) {
    // value 값을 Date 객체로 변환
    const dateObj = new Date(dateTimeItem.value);

    // 년, 월, 일, 시간 구분
    year = dateObj.getFullYear();
    month = dateObj.getMonth() + 1;
    day = dateObj.getDate();
    hours = dateObj.getHours();
    minutes = dateObj.getMinutes();
  } else {
    // dateTimeItem이 없는 경우 현재 시간 사용
    const nowDateObj = new Date();

    year = nowDateObj.getFullYear();
    month = nowDateObj.getMonth() + 1;
    day = nowDateObj.getDate();
    hours = nowDateObj.getHours();
    minutes = nowDateObj.getMinutes();
  }

  // if (dateTimeItem) {
  //   // value 값을 Date 객체로 변환
  //   const dateObj = new Date(dateTimeItem.value);

  //   // 년, 월, 일, 시간 구분
  //   // const year = dateObj.getUTCFullYear();
  //   const year = dateObj.getFullYear();
  //   // const month = dateObj.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1 필요
  //   const month = dateObj.getMonth() + 1;
  //   // const day = dateObj.getUTCDate();
  //   const day = dateObj.getDate();
  //   // const hours = dateObj.getUTCHours();
  //   const hours = dateObj.getHours();
  //   // const minutes = dateObj.getUTCMinutes();
  //   const minutes = dateObj.getMinutes();

  //   console.log(
  //     `${dateTimeItem.name} ${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`
  //   );
  // }

  return (
    <s.Wrapper>
      {/* <>{props.idFromPath}</> */}
      <s.BoardTop>
        <h1>대시보드</h1>
        <div>
          {`${
            dateTimeItem ? "데이터 전송 시간:" : "현재 시간:"
          } ${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`}
        </div>
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
