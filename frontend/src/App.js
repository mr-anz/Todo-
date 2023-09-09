import Todo from "./components/Todo";
import Navbar from './components/Navbar'
import { useEffect } from "react";
import { useStateContext } from "./context";

function App() {
  const {isWallectConnected} = useStateContext()

  useEffect(() => {
    isWallectConnected()
  },[])
  return (
    <div className="h-full glass bg-[#1e1e21]">
      <Navbar/>
      <div className="flex items-center justify-center">
        <div className="  w-full p-5 sm:px-0 mt-20 sm:w-5/6 lg:w-2/5 ">
          <Todo/>
        </div>
      </div>
    </div>
  );
}

export default App;
