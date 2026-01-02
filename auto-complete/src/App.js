import { useEffect, useState } from 'react';

export default function App() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectItem, setSelectedItem] = useState(null);
    async function fetchData(){
        let response = (await fetch('https://dummyjson.com/recipes/search?q='+input));
        let data = await response.json();
        setResult(data.recipes);
        // console.log(input, data);
    }
    function onClickHandler(e) {
        console.log(e.target.textContent);
        setInput(e.target.textContent);
        // e.preventDefault(); // prevent input from loosing the focus.
    }
    function onKeyDownHandler(e) {
        // console.log(e.key);
        if(e.key == "ArrowDown" || e.key == "ArrowUp"){
            let prev = selectItem == null ? -1 : selectItem;
            prev = e.key == "ArrowDown" ? prev+1 : prev-1;
            // console.log((prev%result.length + result.length)%result.length);
            setSelectedItem((prev%result.length + result.length)%result.length);
            e.preventDefault();
        }
        if(e.key === "Enter" && selectItem !== null){
            setInput(result[selectItem].name);
            e.preventDefault();
        }
    }
    useEffect(() => {
        let timeoutId;
        if(input){
            timeoutId = setTimeout(fetchData, 300);
        }
        setSelectedItem(null);
        return () => {
            clearTimeout(timeoutId);
        }
    }, [input]);
  return (
    <div className='container'>
        <h1>Auto complete and type ahead</h1>
        <input className='input' value={input} 
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onKeyDown={onKeyDownHandler}
            ></input>
        {result.length > 0 && showSuggestions &&
        <div className='search-result'>
            {result.map((recipe, index) => {
                return (<div key={recipe.id} className={`search-item ${selectItem === index ? "selected": ""}`} 
                    onMouseDown={onClickHandler}
                    >
                        {recipe.name}
                    </div>);
            })}
        </div>}
    </div>
  );
}
