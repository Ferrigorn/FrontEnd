import "./Nav.css";
import {NavLink} from "react-router-dom";



const Nav = () => {
  return (
    <nav>
        <NavLink to="/"><button>Home</button></NavLink>
        <NavLink to="/about"><button>About</button></NavLink>
        <NavLink to="/gameofthrones"><button>Gallery</button></NavLink>
    </nav>
  )
}

export default Nav