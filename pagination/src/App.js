import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const pageSize = 10;
  async function fetchData() {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json.products);
    setProducts(json.products);
    return json.products;
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <div className="button-container">
        <button
          className="next-button"
          onClick={() =>
            setPage((page) => {
              if (page - 1 < 0) return page;

              return page - 1;
            })
          }
          disabled={page === 0}
        >
          ⬅️
        </button>
        {Array(Math.ceil(products.length / pageSize))
          .fill(0)
          .map((_, index) => (
            <button
              className={page === index ? "selected-button" : ""}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </button>
          ))}
        <button
          className="next-button"
          onClick={() =>
            setPage((page) => {
              if (page + 1 >= Math.ceil(products.length / pageSize))
                return page;
              return page + 1;
            })
          }
          disabled={page === Math.ceil(products.length / pageSize) - 1}
        >
          ➡️
        </button>
      </div>
      <div className="product-container">
        {products
          .slice(page * pageSize, (page + 1) * pageSize)
          .map((product, index) => (
            <div key={index} className="product">
              <img
                key={index}
                src={product.thumbnail}
                width="100px"
                height="100px"
              />
              <div>{product.title}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
