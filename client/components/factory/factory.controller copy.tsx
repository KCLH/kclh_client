import { useState, useEffect } from "react";
import * as mqtt from "mqtt";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function Controller() {
  const [switch1State, setSwitch1State] = useState(false);
  const [switch9State, setSwitch9State] = useState(false);
  const [switch10State, setSwitch10State] = useState(false);
  const [switch11State, setSwitch11State] = useState(false);
  const [switch12State, setSwitch12State] = useState(false);
  const [switch13State, setSwitch13State] = useState(false);
  const [switch31State, setSwitch31State] = useState(false);
  const [switch300State, setSwitch300State] = useState(false);
  const [switch8State, setSwitch8State] = useState(false);
  const [switch14State, setSwitch14State] = useState(false);
  const [switch38State, setSwitch38State] = useState(false);

  const brokerUrl = "mqtt://192.168.0.106:8884";
  const client = mqtt.connect(brokerUrl);

  useEffect(() => {
    client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, []);

  const sendMessage = (id, value) => {
    const topic = "edukit1/control";
    const messageToSend = { tagId: id, value };

    console.log("Sending MQTT message:", messageToSend);
    client.publish(topic, JSON.stringify(messageToSend));
  };

  const handleSwitch1Change = () => {
    setSwitch1State((prevIsOn) => !prevIsOn);
    sendMessage("1", switch1State ? "0" : "1");
  };

  const handleSwitch9Change = () => {
    setSwitch9State((prevIsOn) => !prevIsOn);
    sendMessage("9", switch9State ? "0" : "1");
  };

  const handleSwitch10Change = () => {
    setSwitch10State((prevIsOn) => !prevIsOn);
    sendMessage("10", switch10State ? "0" : "1");
  };

  const handleSwitch11Change = () => {
    setSwitch11State((prevIsOn) => !prevIsOn);
    sendMessage("11", switch11State ? "0" : "1");
  };

  return (
    <FormGroup
      style={{
        backgroundColor: "#f2f2f2",
        width: "400px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>공장 가동</Typography>
        <FormControlLabel
          control={
            <Android12Switch
              checked={switch1State}
              onChange={handleSwitch1Change}
            />
          }
          label=""
        />
        <Typography>공장 정지</Typography>
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Switch 2</Typography>
        <FormControlLabel
          control={
            <Android12Switch
              checked={switch2State}
              onChange={handleSwitch2Change}
            />
          }
          label=""
        />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Switch 3</Typography>
        <FormControlLabel
          control={
            <Android12Switch
              checked={switch3State}
              onChange={handleSwitch3Change}
            />
          }
          label=""
        />
      </Stack>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Switch 4</Typography>
        <FormControlLabel
          control={
            <Android12Switch
              checked={switch4State}
              onChange={handleSwitch4Change}
            />
          }
          label=""
        />
      </Stack>
    </FormGroup>
  );
}
