import NavB from "../components/NavB";

function Simple() {
  return (
    <div className="bg-black min-h-screen" >
      <div class="grid grid-cols-5 grid-rows-6 gap-4 ">
        <div class="w-full col-span-5 row-start-1 row-span-1 bg-blue-500 text-white  font-semibold rounded">
          <NavB/>
        </div>
        <div class="col-start-2 col-span-3 row-start-2 row-span-4 bg-blue-500 text-white flex items-center justify-center font-semibold rounded">
          Item 2
        </div>
        <div class="col-start-5 col-span-1 row-start-4 row-span-2 bg-blue-500 text-white flex items-center justify-center font-semibold rounded">
          Item 3
        </div>
        <div class="col-start-1 col-span-1 row-start-2 row-span-2 bg-blue-500 text-white flex items-center justify-center font-semibold rounded">
          Item 4
        </div>
        <div class="col-start-1 col-span-5 row-start-6 row-span-1 bg-blue-500 text-white flex items-center justify-center font-semibold rounded">
          Item 5
        </div>
      </div>
    </div>
  );
}

export default Simple;
