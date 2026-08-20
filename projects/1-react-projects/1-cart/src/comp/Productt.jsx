function Productt({
  products: { name, price, items, id },
  increment,
  decrement,
  dComp,
}) {
  return (
    <div className="flex  justify-evenly items-center rounded-2xl mb-2 w-full bg-blue-400 text-2xl text-amber-950 mt-4">
      <h1>Name: {name}</h1>
      <h1>Price: {price}</h1>
      <h1>items: {items}</h1>
      <button className="btn btn-warning btn-sm" onClick={() => increment(id)}>
        +
      </button>
      <button className="btn btn-primary btn-sm" onClick={() => decrement(id)}>
        -
      </button>
      <button className="btn btn-error btn-sm" onClick={() => dComp(id)}>
        {" "}
        Del
      </button>

      <h1>Total: {price * items}</h1>
    </div>
  );
}
export default Productt;
