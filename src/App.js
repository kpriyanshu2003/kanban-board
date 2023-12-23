import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { useTheme } from "./functions/zustand";

function App() {
  const theme = useTheme((state) => state.theme);
  return (
    <div
      className={`h-screen ${
        theme ? "bg-[#010409]" : "bg-[#f4f5f8]"
      } transition-all duration-500 overflow-auto`}
    >
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
