import React from "react";
import { Input } from "antd";

export default function CustomInput({ type, precision, ...props }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (type === "number" && precision > 0) {
      const regex = new RegExp(`^\\d*(\\.\\d{0,${precision}})?$`);
      if (!regex.test(value)) {
        value = value.slice(0, -1);
      }
    }
    props.onChange({ target: { name: props.name, value } });
  };

  return (
    <Input
      {...props}
      type={type}
      onChange={handleChange}
      step={precision > 0 ? `0.${"0".repeat(precision - 1)}1` : "1"}
    />
  );
}
