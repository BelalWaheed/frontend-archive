import Productt from "./Productt";
import { MdDarkMode } from "react-icons/md";

const Items = ({
  products,
  increment,
  decrement,
  dComp,
  TotalCost,
  itemsRest,
  setProducts,
  mode,
}) => {
  let removeAll = () => {
    setProducts([]);
  };
  return (
    <div className="flex flex-col justify-center items-center h-3/4">
      <h1 className="text-4xl text-cyan-300 mb-6">Hola</h1>
      <div className="flex justify-evenly w-full ">
        <button className="btn btn-accent btn-sm" onClick={itemsRest}>
          Rest
        </button>
        <button className="btn btn-error btn-sm" onClick={removeAll}>
          Remove All
        </button>
        <button className="btn  btn-sm" onClick={mode}>
          <MdDarkMode />
        </button>
      </div>

      {products.map((p, i) => (
        <Productt
          key={i}
          products={p}
          increment={increment}
          decrement={decrement}
          dComp={dComp}
        />
      ))}
      <h1 className="text-4xl  mt-10">
        {products.length > 0 ? `Total: ${TotalCost}` : "Your Cart is empty"}
      </h1>
    </div>
  );
};

export default Items;
