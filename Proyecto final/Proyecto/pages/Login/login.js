
import { setUser } from "../../components/GlobalState/GlobalState";
import { initController } from "../../utils";
import "./Login.css";


const template = () => `
  <div id="containerLogin">
    <h1 id="titleLogin">LOGIN</h1>
    <input type="text" name="username" id="username" placeholder="Nombre de usuario" />
    <button id="buttonLogin">enviar</button>
  </div>
`;

const addListeners = () => {
  const buttonLogin = document.getElementById("buttonLogin");
  const username = document.getElementById("username");
  buttonLogin.addEventListener("click", (e) => {
    const valueInput = username.value;
    const userToLocalStorage = {
      token: true,
      name: valueInput,
      fav: [],
    };
    
    const stringUser = JSON.stringify(userToLocalStorage);
    localStorage.setItem(`${valueInput}USER`, stringUser);
    sessionStorage.setItem("currentUser", `${valueInput}USER`);
    setUser(`${valueInput}USER`);
    initController();
  });
};

export const Login = () => {
  document.querySelector("main").innerHTML = template();
  addListeners();
};
