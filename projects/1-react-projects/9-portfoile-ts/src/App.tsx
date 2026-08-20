import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button className=" hover:scale-125 transition-in duration-500" >Click me</Button>
    </div>
  );
}

export default App;
