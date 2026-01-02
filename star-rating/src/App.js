import { useState } from 'react';
import StarRating from './StarRating';

export default function App() {
    let [selected, useSelected] = useState(0);
    let [hover, setHover] = useState(null);
    function onStarClick(e) {
      let rating = e.target.dataset.value;
      console.log("hello", rating);
      if(rating){
        useSelected(Number(rating));
      }
    };
    function handleMouseMove(e){
      let rating = e.target.dataset.value;
      if(rating){
        setHover(Number(rating));
      }
    }
    function onMouseLeave(){
      setHover(null);
    }

  return (
    <div className='list'
    onClick={onStarClick}
    onMouseMove={handleMouseMove}
    onMouseLeave={onMouseLeave}
    >
      {Array.from({length: 5}, (_, i) => {
        let rating = i+1;
        if((hover !== null && rating <= hover) || (hover === null && rating<=selected)){
            return <StarRating key = {rating} className="star-icon star-icon-filled" value={rating}/>;
        } else {
            return <StarRating key = {rating} className="star-icon" value = {rating}/>;
        }
      })}
    </div>
  );
}
