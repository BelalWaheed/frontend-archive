import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setAllUsers } from "./redux/userSlices/userSlice";
import { setLogged, setLoggedUser } from "./redux/userSlices/profileSlice";
import UserLayout from "./UserLayout";
import AdminLayout from "./AdminLayout";
import {
  resetCart,
  setLoading,
  setProducts,
} from "./redux/userSlices/productSlice";
import ErrorSection7 from "./pages/user/ErrorSection7";
import axios from "axios";
import SimpleNav from "./components/admin/SimpleNav";
import { ComplexNavbar } from "./components/user/ComplexNavbar";

function App() {
  const dispatch = useDispatch();
  const URL = import.meta.env.VITE_URL;
  const { logged, loggedUser } = useSelector((state) => state.profile);
  const { productChanged, userChanged } = useSelector((state) => state.flags);

  async function getAllUsers() {
    const res = await axios.get(`${URL}/users`);
    const data = res.data;
    dispatch(setAllUsers(data));
  }

  useEffect(() => {
    getAllUsers();
  }, [userChanged]);

  async function getProducts() {
    const res = await axios.get(`${URL}/products`);
    if (res.status === 200) {
      dispatch(setProducts(res.data));
    } else {
      console.log("Error fetching products");
    }
  }

  useEffect(() => {
    getProducts();
  }, [productChanged]);

  async function getUserData() {
    if (localStorage.userI) {
      dispatch(setLoading(true));
      const res = await axios.get(`${URL}/users/${localStorage.userI}`);
      if (res.status === 200) {
        dispatch(setLoggedUser(res.data));
        dispatch(setLogged(true));
        dispatch(setLoading(false));
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, [userChanged]);
  useEffect(() => {
    dispatch(resetCart());
  }, [logged]);

  const { loading } = useSelector((state) => state.products);
  const location = useLocation();
  const pathname = location.pathname;
  const isAdminPath = pathname.startsWith("/admin");

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-60px)] bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] ">
        {isAdminPath ? <SimpleNav /> : <ComplexNavbar />}

        <div className="flex items-center justify-center h-[calc(100vh-60px)] bg-gradient-to-l from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#1e293b] dark:text-white">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-xl font-semibold animate-pulse">
              Loading, please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }
  const isAdmin = loggedUser?.role === "admin";

  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route
        path="/admin/*"
        element={isAdmin ? <AdminLayout /> : <ErrorSection7 />}
      />
    </Routes>
  );
}

export default App;
