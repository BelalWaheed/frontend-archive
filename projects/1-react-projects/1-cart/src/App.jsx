import React, { useState } from "react";
import Nav from "./comp/Nav";
import Items from "./comp/items";

const App = () => {
  const [products, setProducts] = useState([
    { id: 0, name: "shipcy", price: 100, items: 1 },
    { id: 1, name: "pesi", price: 200, items: 1 },
    { id: 2, name: "molto", price: 300, items: 1 },
    { id: 3, name: "kranshy", price: 400, items: 1 },
    { id: 4, name: "cigaretes", price: 500, items: 1 },
  ]);

  const [addedProducts] = useState([
    { id: 0, name: "shipcy", price: 100, items: 1 },
    { id: 1, name: "pesi", price: 200, items: 1 },
    { id: 2, name: "molto", price: 300, items: 1 },
    { id: 3, name: "kranshy", price: 400, items: 1 },
    { id: 4, name: "cigaretes", price: 500, items: 1 },
  ]);

  const [theme, setTheme] = useState(false);

  let mode = () => {
    setTheme(!theme);
  };

  let TotalCost = products.reduce(
    (total, product) => total + product.price * product.items,
    0
  );

  let calculateTotalCost = (products) => {
    return products.reduce(
      (total, product) => total + product.price * product.items,
      0
    );
  };

  let itemsRest = () => {
    let copyP = products.map((p, i) => {
      p.items = 1;
      return p;
    });
    setProducts(copyP);
  };

  const increment = (id) => {
    let copyP = products;

    copyP = copyP.map((p) => {
      if (p.id == id) {
        p.items += 1;
      }
      return p;
    });
    TotalCost = calculateTotalCost(copyP);
    setProducts(copyP);
  };

  const decrement = (id) => {
    let copyP = products;
    let sum = 0;

    copyP = copyP.map((p) => {
      if (p.id == id && p.items > 1) {
        p.items -= 1;
        sum += p.price * p.items;
      }

      return p;
    });
    TotalCost = calculateTotalCost(copyP);

    setProducts(copyP);
  };

  const dComp = (id) => {
    let copyP = products;

    copyP = copyP.filter((p) => {
      if (p.id != id) {
        return p;
      }
    });
    TotalCost = calculateTotalCost(copyP);
    setProducts(copyP);
  };

  const addP = (name) => {
    setProducts((prevProducts) => {
      const productExists = prevProducts.find((p) => p.name === name);

      if (productExists) {
        return prevProducts.map((p) => {
          if (p.name === name) {
            p.items += 1;
          }
          return p;
        });
      } else {
        const newProduct = addedProducts.find((p) => p.name === name);
        if (newProduct) {
          return [{ ...newProduct, items: 1 }, ...prevProducts];
        }
      }

      // if no product was found, return the previous state
      return prevProducts;
    });
  };

  return (
    <div className={`h-screen ${theme ? "darkMode" : "lightMode"}`}>
      <Nav products={products} addP={addP} />

      <Items
        products={products}
        setProducts={setProducts}
        increment={increment}
        decrement={decrement}
        dComp={dComp}
        TotalCost={TotalCost}
        itemsRest={itemsRest}
        mode={mode}
      />
    </div>
  );
};

export default App;
