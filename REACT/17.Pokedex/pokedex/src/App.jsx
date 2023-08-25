import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <Header />
      <main className="mainContainer">
        
        <Outlet/>
      </main>
      <Footer />
    </>
  );
}

export default App;
