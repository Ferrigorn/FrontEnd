import "./NavAbout.css";
import { NavLink } from "react-router-dom";



const NavAbout = () => {
  return (
    <nav>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
    </nav>
  );
};

export default NavAbout;
