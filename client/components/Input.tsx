"use client";

// import React, { ChangeEvent} from "react";
import { ChangeEvent, memo } from "react";

interface InputProps {
  svg?: JSX.Element;
  name: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ svg, name, placeholder, type, value, onChange }: InputProps) {
  return (
    <div>
      {svg}
      <input
        placeholder={placeholder}
        spellCheck={false}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className=""
      />
    </div>
  );
}

// export default React.memo(Input);
export default memo(Input);
