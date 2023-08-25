import "./Navbar.css";
import { NavLink } from "react-router-dom";

import React from "react";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">
        <button id="homebutton">Home</button>
      </NavLink>
      <NavLink to="/pokedex">
        <button id="pokemonbutton">
          <img
            id="pokedex"
            src="https://res.cloudinary.com/dyyzufpto/image/upload/v1692564269/639a57a4e075fb1dfa7ed0407ba0031f_pvv7mg.png"
          />
        </button>
      </NavLink>
    </nav>
  );
};

export default Navbar;
