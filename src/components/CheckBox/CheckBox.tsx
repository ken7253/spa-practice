import React from "react";
import "./CheckBox.css";

interface Props {
  children?: string;
  value?: string;
  onChange?: () => void;
}

const CheckBox:React.FC<Props> = (props:Props) => {
  return(
  <>
    <label>
      <input type="checkbox" onChange={props.onChange} value={props.value} />
      {props.children}
    </label>
  </>
  )
}

export default CheckBox;