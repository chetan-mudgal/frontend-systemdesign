import React from "react";
import "./index.css";

interface ItemProps {
  children: (React.JSX.Element | string)[];
  index: number;
}
function Item(props: ItemProps) {
  return (
    <li tabIndex={0} className="text">
      {props.children}
    </li>
  );
}

export default Item;
