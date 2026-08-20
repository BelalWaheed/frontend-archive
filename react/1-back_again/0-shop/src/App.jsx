import { useSelector } from "react-redux";

function App() {
  const { items } = useSelector((state) => state.productSliceReducer);

  return (
    <div className="product-list">
      <h1>Products</h1>
      {items &&
        items.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="rating">
              <p>Rating: {product.rating.rate}</p>
              <p>Count: {product.rating.count}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
