// import { useState, useEffect } from "react";
// import { w3cwebsocket } from "websocket";
// import "bootstrap/dist/css/bootstrap.min.css";
// import mqtt from "mqtt";

// function App() {
//   const [client, setClient] = useState(null);
//   const [receivedData, setReceivedData] = useState("");
//   const [tableData, setTableData] = useState([]);

//   useEffect(() => {
//     const newClient = new w3cwebsocket("ws://192.168.0.106:1884");
//     setClient(newClient);

//     return () => {
//       if (newClient && newClient.readyState === newClient.OPEN) {
//         newClient.close();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (client) {
//       client.onmessage = (message) => {
//         setReceivedData(message.data);

//         try {
//           const parsedData = JSON.parse(message.data);
//           console.log(parsedData);
//           setTableData(parsedData.Wrapper);
//         } catch (error) {
//           console.error("Error parsing data:", error);
//         }
//       };
//     }
//   }, [client]);

//   return (
//     <>
//       <div className="container mt-5">
//         <h1 className="mb-4">실시간 데이터 확인</h1>
//         <div className="table-responsive">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>tagId</th>
//                 <th>name</th>
//                 <th>value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((item) => (
//                 <tr key={item.tagId}>
//                   <td>{item.tagId}</td>
//                   <td>{item.name}</td>
//                   <td>{item.value.toString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// // export default App;
// import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import * as mqtt from "mqtt";

// function App() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
//     const topic = "dblee1"; // 구독할 MQTT 토픽

//     const client = mqtt.connect(brokerUrl);

//     client.on("connect", () => {
//       console.log("Connected to MQTT broker");
//       client.subscribe(topic);
//     });

//     client.on("message", (topic, message) => {
//       const note = message.toString();
//       console.log(note);

//       // 이전 메시지와 함께 현재 메시지를 배열에 추가
//       setMessages((prevMessages) => [...prevMessages, note]);
//     });

//     return () => {
//       if (client) {
//         client.end(); // 컴포넌트가 언마운트될 때 MQTT 클라이언트 연결 종료
//       }
//     };
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">실시간 데이터 확인</h1>
//       <div className="table-responsive">
//         <ul>
//           {messages.map((message, index) => (
//             <li key={index}>{message}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as mqtt from "mqtt";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const brokerUrl = "mqtt://192.168.0.106:8884"; // MQTT 브로커 주소
    const topic = "edukit1"; // 구독할 MQTT 토픽
    // const topic = "edukit2"; // 구독할 MQTT 토픽

    // MQTT 클라이언트 생성 및 연결
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe(topic); // 지정한 토픽을 구독
    });

    client.on("message", (topic, message) => {
      // 메시지 수신 시 실행되는 콜백 함수
      try {
        const parsedData = JSON.parse(message.toString());
        console.log(parsedData);
        setTableData(parsedData.Wrapper);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    });

    return () => {
      if (client) {
        client.end(); // 컴포넌트가 언마운트될 때 MQTT 클라이언트 연결 종료
      }
    };
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">실시간 데이터 확인</h1>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>tagId</th>
                <th>name</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.tagId}>
                  <td>{item.tagId}</td>
                  <td>{item.name}</td>
                  <td>{item.value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
