// MqttDataFetcher.tsx

import React, { useEffect } from "react";
import { useMqttClient } from "@/components/hooks/useMqttClient";
import { MqttDataItem } from "@/components/chart/MqttChart.type";

interface MqttDataFetcherProps {
  brokerUrls: string[]; // 2개의 MQTT 브로커 주소를 받아옵니다.
  topics: string[]; // 4개의 토픽을 받아옵니다.
  children: (data: {
    plcDatas: MqttDataItem[][];
    iotDatas: MqttDataItem[][];
    isLoading: boolean;
  }) => React.ReactNode;
}

const MqttDataFetcher: React.FC<MqttDataFetcherProps> = ({
  brokerUrls,
  topics,
  children,
}) => {
  const mqttDataList = brokerUrls.map((url, index) =>
    useMqttClient(url, topics[index])
  );

  const isLoading = mqttDataList.some((data) => data.isLoading);

  useEffect(() => {
    if (!isLoading) {
      // 모든 데이터가 로딩된 후에 처리할 작업을 추가할 수 있습니다.
    }
  }, [isLoading]);

  const plcDatas = mqttDataList.map((data) => data.plcData);
  const iotDatas = mqttDataList.map((data) => data.iotData);

  return (
    <div>
      {children({
        plcDatas,
        iotDatas,
        isLoading,
      })}
    </div>
  );
};

export default MqttDataFetcher;
