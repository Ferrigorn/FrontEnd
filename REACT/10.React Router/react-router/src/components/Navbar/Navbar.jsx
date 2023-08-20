import "./Navbar.css";
import { NavLink } from "react-router-dom";

import React from "react";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/heroes">
        <button>Heroes</button>
      </NavLink>
  
    </nav>
  );
};

export default Navbar;
