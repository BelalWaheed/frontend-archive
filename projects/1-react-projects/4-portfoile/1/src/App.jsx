import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NavB from "./components/NavB";
import FooterB from "./components/FooterB";
import Simple from "./pages/simple";

function App() {
  return (
    <div className="">
      <NavB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/simple" element={<Simple />} />
      </Routes>
      <FooterB />
    </div>
  );
}
export default App;
