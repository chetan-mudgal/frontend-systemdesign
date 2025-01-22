import React, { forwardRef } from "react";
import "./index.css";

import Item from "./item";
import useHighlightText from "./useHighlightText";
interface IItem {
  text: string;
}
interface ListItemsProps {
  value: string;
  items: IItem[];
  isLoading: boolean;
  onItemSelect: (itemText: string) => void;
}
const ListItems = forwardRef(function ListItems(
  props: ListItemsProps,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const highlightText = useHighlightText(props.value);

  return (
    <ul
      ref={ref}
      className="SuggestionBox"
      role="listbox"
      onClick={(e) => {
        props.onItemSelect(e.target.textContent || "");
      }}
    >
      {props.isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        props.items.map((item, index) => (
          <>
            <div className="line"></div>
            <Item
              key={index}
              children={highlightText(item.text)}
              index={index}
            />
          </>
        ))
      )}
    </ul>
  );
});
export default ListItems;
