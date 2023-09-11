import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CustomSelect({ label, options, register }: any) {
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  <Select
    labelId="demo-simple-select-required-label"
    id="demo-simple-select-required"
    value={age}
    label="Age *"
    onChange={handleChange}
  ></Select>;

  return (
    <FormControl fullWidth variant="filled" sx={{ m: 1.5, minWidth: 120 }}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        {...register(label.toLowerCase())}
        labelId={`${label}-simple-select-filled-label`}
        id={`${label}-simple-select-filled`}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>선택</em>
        </MenuItem>
        {options.map((option: any) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
