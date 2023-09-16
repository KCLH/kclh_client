"use client";

import { useMqttClient } from "@/components/hooks/useMqttClient";
import BoardUI from "@/components/board/board.presenter";
import { extractDateTime } from "@/components/utils/dateUtils";

export default function BoardContainer(props: any) {
  const brokerUrl = "mqtt://192.168.0.106:8884";
  const topic1 = "edukit1";
  const topic2 = "iot1/info";

  const { plcData, isLoading: isLoading1 } = useMqttClient(brokerUrl, topic1);
  const { iotData, isLoading: isLoading2 } = useMqttClient(brokerUrl, topic2);

  // tagId가 '0'인 항목 찾기
  const dateTimeItem = plcData.find((item) => item.tagId === "0");

  let dateTime;
  if (dateTimeItem) {
    dateTime = extractDateTime(new Date(dateTimeItem.value));
  } else {
    dateTime = extractDateTime(new Date());
  }
  // console.log(plcData);
  // console.log(iotData);
  return (
    <BoardUI
      id={props.id}
      pathname={props.pathname}
      idFromPath={props.idFromPath}
      dateTime={dateTimeItem ? "데이터 전송 시간" : "현재 시간"}
      isLoading1={isLoading1}
      isLoading2={isLoading2}
      plcData={plcData}
      iotData={iotData}
      {...dateTime}
    />
  );
}
