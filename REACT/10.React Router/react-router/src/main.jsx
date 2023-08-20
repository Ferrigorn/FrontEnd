import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Heroes from "./pages/Heroes/Heroes.jsx";
import Heroe from "./pages/Heroe/Heroe.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="heroes" element={<Heroes />} />
          <Route path="heroes/heroe/:id" element={<Heroe />} />
          <Route path="about" element={<About />} />
          <Route
            path="*"
            element={
              <main>
                <p>Ruta no encontrada</p>
              </main>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
