import { useState } from "react";
import { hierarchy } from "./data";

function List({ items, handleAddFiles }) {
  const complexState = items.reduce((obj, current) => {
    if (current.isFolder) {
      return { ...obj, [current.name]: false };
    } else {
      return obj;
    }
  }, {});
  const [inputBox, setInputBox] = useState(complexState);
  const [isFile, setIsFile] = useState(null);
  const [open, setOpen] = useState(complexState);
  const [newFileName, setNewFileName] = useState("");
  console.log(newFileName);

  function handleKeyDown(e, item) {
    if (e.key == "Enter" && newFileName) {
      handleAddFiles(newFileName, isFile, item);
      setInputBox((prev) => ({ ...prev, [item.name]: false }));
      setIsFile(null);
      setNewFileName("");
    }
  }

  return (
    items.length > 0 &&
    items.map((item) => (
      <div className="list">
        <div className="list-item">
          {item.isFolder && (
            <span
              onClick={() =>
                // Spread the previous state into a new object and updates the specific property, ensuring React detects the state change and triggers a re-render.
                setOpen((prev) => ({
                  ...prev,
                  [item.name]: !prev[item.name],
                }))
              }
            >
              {open[item.name] ? "- " : "+ "}
            </span>
          )}
          <span
            onClick={() =>
              item.isFolder &&
              setOpen((prev) => ({
                ...prev,
                [item.name]: !prev[item.name],
              }))
            }
          >
            {item.name}
          </span>

          {item.isFolder && (
            // React fragment
            <>
              {/*add folder */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/4732/4732392.png"
                height={20}
                onClick={() => {
                  setInputBox((prev) => ({
                    ...prev,
                    [item.name]: !prev[item.name],
                  }));
                  setIsFile((prev) => {
                    if (prev === null) {
                      return false;
                    }
                    return null;
                  });
                }}
              />
              {/*add file */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1091/1091916.png"
                height={20}
                onClick={() => {
                  setInputBox((prev) => ({
                    ...prev,
                    [item.name]: !prev[item.name],
                  }));
                  setIsFile((prev) => {
                    if (prev === null) {
                      return true;
                    }
                    return null;
                  });
                }}
              />
            </>
          )}
          <img
            src="https://cdn-icons-png.flaticon.com/512/7391/7391458.png"
            height={20}
          />
        </div>
        {item.isFolder && inputBox[item.name] && (
          <input
            name="input"
            className="input"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          />
        )}
        {item.isFolder && open[item.name] && (
          <List items={item.children} handleAddFiles={handleAddFiles} />
        )}
      </div>
    ))
  );
}

export default function App() {
  const [items, setItems] = useState(hierarchy);
  function addFileOrFolder(items, name, isFile, parent) {
    if (items === null || items === undefined || items.length == 0) {
      return items;
    }
    // console.log(items);
    for (const item of items) {
      if (item.isFolder && item.name == parent.name) {
        item.children = [
          ...item.children,
          {
            name: name,
            isFolder: !isFile,
            children: [],
          },
        ];
        return [...items];
      } else if (item.isFolder && item.children) {
        item.children = addFileOrFolder(item.children, name, isFile, parent);
      }
    }
    return [...items];
  }

  function handleAddFiles(name, isFile, parent) {
    setItems((items) => {
      const newItems = addFileOrFolder(items, name, isFile, parent);
      console.log(newItems);
      return newItems;
    });
  }
  return (
    <div className="container">
      <h1>File Explorer</h1>
      <List items={items} handleAddFiles={handleAddFiles} />
    </div>
  );
}
