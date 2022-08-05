import React, { ChangeEvent } from "react";
import "./CheckBox.css";

interface Props {
  children?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent) => void;
}

const CheckBox: React.FC<Props> = (props: Props) => {
  return (
    <>
      <label>
        <input
          className="check"
          type="checkbox"
          onChange={props.onChange}
          value={props.value}
        />
        {props.children}
      </label>
    </>
  );
};

export default CheckBox;
