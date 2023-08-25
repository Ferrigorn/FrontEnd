import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Routes/Home/Home.jsx";
import About from "./Routes/About/About.jsx";
import GameOfThrones from "./Routes/GameOfThrones/GameOfThrones.jsx";
import Character from "./Routes/Character/Character.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gameofthrones",
        element: <GameOfThrones />,
      },
      {
        path: "/gameofthrones/character/:id",
        element: <Character />,
      },

      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
