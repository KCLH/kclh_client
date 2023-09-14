"use client";

import Cookies from "universal-cookie";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import * as s from "@/components/board/board.styles";
import Dashboard from "../chart/Dashboard";
import { useState } from "react";

export default function BoardUI(props: any) {
  const cookies = new Cookies();

  const brokerUrl = "mqtt://192.168.0.106:8884";
  const topic1 = "edukit1";
  const topic2 = "iot1/info";

  const MqttData1 = useMqttClient(brokerUrl, topic1);
  const MqttData2 = useMqttClient(brokerUrl, topic2);

  let year, month, day, hours, minutes;

  // tagId가 '0'인 항목 찾기
  const dateTimeItem = MqttData1.find((item) => item.tagId === "0");
  // console.log("MqttData1", MqttData1);
  // console.log("MqttData2", MqttData2);

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

      <Dashboard />
    </s.Wrapper>
  );
}
