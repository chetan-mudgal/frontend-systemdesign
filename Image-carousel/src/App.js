import { useEffect, useState } from "react";
const SIZE = 5;
export default function App() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [mouseUp, setMouseUp] = useState(false);

  async function fetchData() {
    let data = await fetch(
      `https://picsum.photos/v2/list?page=1&limit=${SIZE}`
    );
    let imagesData = await data.json();
    let newState = imagesData.map((img, index) => ({
      id: index,
      src: img.download_url,
    }));
    setImages(newState);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (mouseUp) return;
    let interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SIZE);
    }, 3000);
    return () => clearInterval(interval);
  }, [mouseUp]);
  return (
    <div className="container">
      <div
        className="button"
        onClick={() =>
          setCurrent((prev) => {
            if (prev === 0) {
              return SIZE - 1;
            }
            return prev - 1;
          })
        }
        onMouseEnter={() => setMouseUp(true)}
        onMouseLeave={() => setMouseUp(false)}
      >
        {"<"}
      </div>
      <img
        src={images[current]?.src}
        className="image"
        onMouseEnter={() => setMouseUp(true)}
        onMouseLeave={() => setMouseUp(false)}
      />
      <div
        className="button"
        onClick={() =>
          setCurrent((prev) => {
            if (prev === SIZE - 1) {
              return 0;
            }
            return prev + 1;
          })
        }
        onMouseEnter={() => setMouseUp(true)}
        onMouseLeave={() => setMouseUp(false)}
      >
        {">"}
      </div>
    </div>
  );
}
