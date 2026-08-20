import { useEffect } from "react";
import { getData } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import StockCard from "../../components/products/StockCard";
import LoadingState from "../../components/loading/LoadingState";

const Products = () => {
  const { stock, stockLoading, stockError } = useSelector(
    (state) => state.stock
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (stockLoading) {
    return <LoadingState />;
  }

  console.log(stockError);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 py-4">
      <h1>Products</h1>

      <div className="w-full flex justify-evenly flex-wrap">
        {stock.map((st) => (
          <StockCard key={st.id} stock={st} />
        ))}
      </div>
    </div>
  );
};

export default Products;
