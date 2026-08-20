import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { CarouselPlugin } from "./components/ui/carr.tsx";

createRoot(document.getElementById("root")!).render(
  <div className="">
    {/* <App /> */}
    <div className="flex justify-center items-center min-h-screen">

    <CarouselPlugin />
    </div>
  </div>,
);
