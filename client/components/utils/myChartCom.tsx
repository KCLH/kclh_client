// import { useMqttClient } from '@/components/hooks/useMqttClient';
// import { MyChartData } from './MyChartData';
// import useChart from '@/components/hooks/useChart';

// // 이 컴포넌트는 실제로 차트를 화면에 그리는 역할.
// const MyComponent: FC = () => {

//   // MQTT 클라이언트로부터 데이터를 가져옴.
//   const tableData = useMqttClient('mqtt://brokerUrl', 'myTopic');

//   const myOptions ={...}; // 여기에 차트의 옵션을 설정.

//   // 필터 함수를 정의합니다. 여기서는 모든 데이터가 true를 반환.
//   const filterFunc = (item: TableDataItem) => true;

//   // 가져온 데이터(tableData)를 필터링하고, 차트 데이터로 변환.
//   const barChartData = MyChartData(tableData, filterFunc);
//   const lineChartData = MyChartData(tableData, filterFunc);

//   // 레이블 지정
//   barChartData.datasets[0].label = "# of Votes";

//   // 스타일 지정
//   barChartData.datasets[0].backgroundColor = "rgb(75,192,192)";
//   barChartData.datasets[0].borderColor = "rgba(75,192,192 ,0.4)";

//    // 막대 차트와 선형 차트에 대한 설정.
//    const barConfig = useChart({type: 'bar', data :barChartData, options :myOptions});
//    const lineConfig = useChart({type: 'line', data :lineChartData, options :myOptions});

//  return (
//  <>
//    {/* 화면에 막대 차트와 선형 차트를 그림. */}
//    <canvas ref={barConfig.ref} />
//    <canvas ref={lineConfig.ref} />
//  </>
//  );
// };

// export default MyComponent;

// import { useMqttClient } from '@/components/hooks/useMqttClient';
// import { MyChartData } from './MyChartData';
// import useChart from '@/components/hooks/useChart';
// import { FC, useState, useEffect } from 'react';
// import { TableDataItem } from '@/components/chart/Chart.type';

// const MyComponent: FC = () => {
//   const tableData = useMqttClient('mqtt://brokerUrl', 'myTopic');
//   const myOptions ={...}; // Set your chart options

//   // Filter function based on tagId
//   const filterFunc = (item: TableDataItem) => item.tagId === 'desiredTagId';

//   // State for chart data
//   const [barChartData, setBarChartData] = useState({});
//   const [lineChartData, setLineChartData] = useState({});

//   // Update chart data when tableData changes
//   useEffect(() => {
//     setBarChartData(MyChartData(tableData, filterFunc));
//     setLineChartData(MyChartData(tableData, filterFunc));

//     // Set labels and styles here or in another useEffect if needed.
//     barChartData.datasets[0].label = "# of Votes";
//     barChartData.datasets[0].backgroundColor = "rgb(75,192,192)";
//     barChartData.datasets[0].borderColor = "rgba(75,192,192 ,0.4)";

//    }, [tableData]);

//    const barConfig = useChart({type: 'bar', data :barChartData.data || {}, options :myOptions});
//    const lineConfig = useChart({type: 'line', data :lineChartData.data || {}, options :myOptions});

//  return (
//  <>
//    <canvas ref={barConfig.ref} />
//    <canvas ref={lineConfig.ref} />
//  </>
//  );
// };

// export default MyComponent;

import { useMqttClient } from "@/components/hooks/useMqttClient";
import { MyChartData } from "@/components/utils/MyChartData";
import useChart from "@/components/hooks/useChart";
import { FC, useState, useEffect } from "react";
import { TableDataItem } from "@/components/chart/Chart.type";
import { ChartData } from "chart.js";

const MyComponent: FC = () => {
  // MQTT 클라이언트로부터 데이터를 가져옴.
  const tableData = useMqttClient("mqtt://brokerUrl", "myTopic");

  // 차트 옵션 지정
  const myOptions = {
    // 여기에 차트 옵션을 작성.
  };

  // tagId를 기준으로 필터링하는 함수
  const filterFunc = (item: TableDataItem) =>
    item.tagId === Number("desiredTagId");

  // 차트 데이터의 초기 상태와 형태를 설정
  const [barChartData, setBarChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        fill: false,
        backgroundColor: "",
        borderColor: "",
      },
    ],
  });

  const [lineChartData, setLineChartData] = useState<ChartData>(barChartData);

  useEffect(() => {
    if (tableData.length > 0) {
      let newBarData: ChartData = MyChartData(tableData, filterFunc);
      newBarData.datasets[0].label = "# of Votes";
      newBarData.datasets[0].backgroundColor = "rgb(75,192,192)";
      newBarData.datasets[0].borderColor = "rgba(75,192,192 ,0.4)";

      setBarChartData(newBarData);

      let newLineData: ChartData = MyChartData(tableData, filterFunc);

      setLineChartData(newLineData);
    }
  }, [tableData]); // tableData가 변경될 때마다 실행

  const barConfig = useChart({
    type: "bar",
    data: barChartData || {},
    options: myOptions,
  });
  const lineConfig = useChart({
    type: "line",
    data: lineChartData || {},
    options: myOptions,
  });

  return (
    <>
      {/* 화면에 막대 차트와 선형 차트를 그림. */}
      <canvas ref={barConfig.ref} />
      <canvas ref={lineConfig.ref} />
    </>
  );
};

export default MyComponent;
