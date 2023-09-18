import { useMqttClient } from "@/components/hooks/useMqttClient";
import CasinoIcon from "@mui/icons-material/Casino";
const brokerUrl = "mqtt://192.168.0.106:8884";
const topic = "edukit1";

export default function PlcDiceNum() {
  // const [mqttData, setMqttData] = useState([]); // MQTT 데이터 저장
  const { plcData, isLoading } = useMqttClient(brokerUrl, topic); // MQTT 데이터 가져오기

  const DiceComparisonValue = plcData.find((item) => item.tagId === "38");

  let DiceName;
  let DiceValue;
  if (DiceComparisonValue) {
    DiceName = DiceComparisonValue.name;
    DiceValue = DiceComparisonValue.value;
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CasinoIcon
        style={{
          fontSize: "64px",
          color: "royalblue",
        }}
      />
      <h1>{DiceValue}</h1>
      <div>주사위 비교 숫자</div>
      <div>{DiceName}</div>
    </div>
  );
}
