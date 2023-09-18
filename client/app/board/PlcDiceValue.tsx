import { useMqttClient } from "@/components/hooks/useMqttClient";
import CasinoIcon from "@mui/icons-material/Casino";
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

export default function PlcDiceValue() {
  // const [mqttData, setMqttData] = useState([]); // MQTT 데이터 저장
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic); // MQTT 데이터 가져오기

  const DiceValue = plcData.find((item) => item.tagId === "37");

  let DiceName;
  let DiceVal;
  if (DiceValue) {
    DiceName = DiceValue.name;
    DiceVal = DiceValue.value;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CasinoIcon
        style={{
          fontSize: "64px",
          color: "tomato",
        }}
      />
      <h1>{DiceVal}</h1>
      <div>주사위 값</div>
      <div>{DiceName}</div>
    </div>
  );
}
