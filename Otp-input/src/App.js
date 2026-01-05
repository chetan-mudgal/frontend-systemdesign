import { useEffect, useRef, useState } from "react";

export default function App() {
  const [inputArr, setinputArr] = useState(new Array(5).fill(""));
  const inputRefs = useRef([]);

  function handleOnChange(val, index) {
    if (isNaN(val)) return; // take only number not any character

    const newArr = [...inputArr]; // create a new reference array.
    newArr[index] = val.slice(-1); // take only last digit of the number in one box
    if (index + 1 < inputArr.length) inputRefs.current[index + 1].focus();

    setinputArr(newArr);
  }

  function handlekeyDown(e, index) {
    if (e.key == "Backspace") {
      const newArr = [...inputArr]; // create a new reference array.
      newArr[index] = "";
      console.log(newArr);
      setinputArr(newArr);

      if (index - 1 >= 0) inputRefs.current[index - 1].focus();
      e.preventDefault();
    }
  }

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  return (
    <div className="root-contianer">
      <h1>Validate OTP</h1>

      <div className="container">
        {inputArr.map((v, index) => {
          return (
            <input
              key={index}
              className="box"
              // onKeyDown={handleKeyDown}
              value={inputArr[index]}
              onChange={(e) => handleOnChange(e.target.value, index)}
              ref={(input) => {
                inputRefs.current[index] = input;
              }}
              onKeyDown={(e) => handlekeyDown(e, index)}
            />
          );
        })}
      </div>
    </div>
  );
}
