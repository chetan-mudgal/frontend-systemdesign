import { useEffect, useRef, useState } from "react";
import "./index.css";

import ListItems from "./list-items";
import useDebounceInput from "./useDebounceFn";
function SearchBox() {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const debouncedInput = useDebounceInput(inputValue, 100);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const cache = useRef(new Map<string, []>());

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelected(false);
    console.log("Input changed");
  };

  const fetchData = async (query: string) => {
    console.log("Fetching data");
    if (cache.current.has(query)) {
      console.log("Data found in cache");
      setSuggestions(cache.current.get(query));
      return;
    }
    setLoading(true);
    let data;
    try {
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await response.json();
      const items = data.users.map((user) => {
        return {
          text: `${user.firstName} ${user.lastName}`,
        };
      });
      cache.current.set(query, items);
      setSuggestions(items);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
      setFocusedIndex(-1);
    } finally {
      setLoading(false);
    }
  };

  const onItemSelect = (itemText: string) => {
    console.log("Item selected");
    setInputValue(itemText);
    setSuggestions([]);
    setFocusedIndex(-1);
    setSelected(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (debouncedInput.length > 0 && !selected) {
      console.log("Fetching suggestions");
      fetchData(debouncedInput);
    } else {
      console.log("Clearing suggestions");
      setSuggestions([]);
      setFocusedIndex(-1);
    }
  }, [debouncedInput, selected]);

  const handleListItemKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    const listItems: ChildNode[] = [];
    listRef.current?.childNodes.forEach((child) => {
      if (child.nodeName === "LI") {
        listItems.push(child);
      }
    });
    const length = listItems.length;

    if (event.key === "ArrowDown") {
      console.log("Arrow down key pressed");
      const element = listItems[(focusedIndex + 1) % length];
      element?.focus({
        focusVisible: true,
      });
      setFocusedIndex((focusedIndex + 1) % length);
    } else if (event.key === "Enter") {
      console.log("Enter key pressed");
      const element = listItems[focusedIndex];
      if (element) {
        console.log(element.textContent);
        onItemSelect(element.textContent || "");
      }
    }
  };

  return (
    <div className="SearchBox" onKeyDown={handleListItemKeyDown}>
      <input
        ref={inputRef}
        value={inputValue}
        type="search"
        placeholder="Search..."
        className="SearchInput"
        onChange={onChangeHandler}
      />
      {suggestions.length === 0 &&
        debouncedInput.length > 0 &&
        !loading &&
        !selected && <div className="no-results">No results found</div>}
      {suggestions.length > 0 && debouncedInput.length > 0 && (
        <ListItems
          value={debouncedInput}
          items={suggestions}
          isLoading={loading}
          onItemSelect={onItemSelect}
          ref={listRef}
        />
      )}
    </div>
  );
}

export default SearchBox;
