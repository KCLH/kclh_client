"use client";

import { useMqttClient } from "@/components/hooks/useMqttClient";
import BoardUI from "@/components/board/board.presenter";
import { extractDateTime } from "@/components/utils/dateUtils";
import { useEffect, useState } from "react";

export default function BoardContainer(props: any) {
  console.log(props.idFromPath);
  const brokerUrl = "mqtt://192.168.0.106:8884";
  // const eduKitTopic = `edukit${props.idFromPath}`;
  const eduKitTopic = "edukit1";
  // const iotTopic = `iot${props.idFromPath}/info`;
  const iotTopic = "iot1/info";

  const { plcData, isLoading: eduKitIsLoading } = useMqttClient(
    brokerUrl,
    eduKitTopic
  );
  const { iotData, isLoading: iotIsLoading } = useMqttClient(
    brokerUrl,
    iotTopic
  );

  // tagId가 '0'인 항목 찾기
  const dateTimeItem = plcData.find((item) => item.tagId === "0");

  let dateTime;
  if (dateTimeItem) {
    dateTime = extractDateTime(new Date(dateTimeItem.value));
  } else {
    dateTime = extractDateTime(new Date());
  }

  return (
    <BoardUI
      id={props.id}
      pathname={props.pathname}
      idFromPath={props.idFromPath}
      dateTime={dateTimeItem ? "데이터 전송 시간" : "현재 시간"}
      eduKitIsLoading={eduKitIsLoading}
      iotIsLoading={iotIsLoading}
      plcData={plcData}
      iotData={iotData}
      {...dateTime}
      brokerUrl={brokerUrl}
      eduKitTopic={eduKitTopic}
      iotTopic={iotTopic}
    />
  );
}
