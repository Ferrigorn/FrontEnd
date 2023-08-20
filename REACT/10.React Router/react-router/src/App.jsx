import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Main />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
