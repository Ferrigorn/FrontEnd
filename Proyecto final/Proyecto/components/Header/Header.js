

import { initController } from "../../utils/route";
import { getUser } from "../GlobalState/GlobalState";
import "./Header.css";


const template = () => `
  <img
    src="https://res.cloudinary.com/dyyzufpto/image/upload/c_thumb,w_490,h_490,g_auto/v1690716672/logo_new_140x_2x_tbezdx.avif"
    alt="Icono pagina"
    class="logo"
  />
  <nav>
    <img
      src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690717876/3963860_tqmgir.png"
      alt="change color"
      id="changeColor"
    />
    <img
      src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690716491/DGUN-2960-Super-GamePad_PR6_1024x1024_q7e4we.webp"
      alt="acces to play"
      id="buttonDashboard"
    />
    <img
      src="https://res.cloudinary.com/dyyzufpto/image/upload/v1690408091/logout-icon_dvbbzh.png"
      alt="Logout"
      id="buttonLogout"
    />
  </nav>
`;


const addListeners = ()=>{
    const changeColor = document.getElementById("changeColor");
    changeColor.addEventListener("click", (e)=>{
        console.log(e.target.id)
    });
   
    const buttonDashboard = document.getElementById("buttonDashboard");
    buttonDashboard.addEventListener("click", (e)=>{
      initController("Dashboard")
    });

    const buttonLogout = document.getElementById("buttonLogout");
    buttonLogout.addEventListener("click", (e)=>{
      const userState = getUser().name;
      const currentUser = localStorage.getItem(userState);
      const parseCurrentUser = JSON.parse(currentUser);
      const updateUser = { ...parseCurrentUser, token: false };
      const stringUpdateUser = JSON.stringify(updateUser);
      localStorage.removeItem(userState);
      sessionStorage.removeItem("currentUser");
      localStorage.setItem(userState, stringUpdateUser);
      initController("Login");
    });
    

};


export const printTemplateHeader = () => {
  document.querySelector("header").innerHTML = template();
  addListeners();
};
