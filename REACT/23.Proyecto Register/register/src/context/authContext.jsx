import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Creamos contexto con createContext y lo inicializamos

const AuthContext = createContext();

// Creamos la funcion del contexto

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  //estado con el user autenticado
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");

    if (data) {
      const parseUser = JSON.parse(data);

      return parseUser;
    } else {
      return null;
    }
  });

  //estado para el user del register
  const [allUser, setAllUser] = useState({
    data: {
      confirmationCode: "",
      user: {
        password: "",
        email: "",
      },
    },
  });

  //para el login
  const userLogin = (data) => {
    localStorage.setItem("user", data);
    const parseUser = JSON.parse(data); //parseamos la información de data
    setUser(() => parseUser);
  };

  //para el logout
  const logout = () => {
    localStorage.removeItem("user"); //eliminamos la data del localstorage
    setUser(null); //seteamos el estado de user a null porque ya esta "fuera"
    navigate("/login"); // redirigimos al usuario al login
  };

  // Puente para los problemas de asyncronia

  const bridgeData = (state) => {
    const data = localStorage.getItem("data"); //nos traemos la informacion del localstorage
    const dataJson = JSON.parse(data); //parseamos dicha informacion

    switch (state) {
      case "ALLUSER":
        setAllUser(dataJson);
        localStorage.removeItem("data");
        break;

      default:
        break;
    }
  };

  const value = useMemo(
    //envolvemos la información en un useMemo (value) para tenerlo almacenado en un espacio de memoria y
    // poder acceder a el de forma optimizada
    () => ({
      user,
      setUser,
      allUser,
      setAllUser,
      userLogin,
      logout,
      bridgeData,
    }),
    [user, allUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; // retornamos el contexto general con el valor, en este caso, del useMemo
  // y será utilizado por los children
};


// CustomHook que se encarga de utilizar el contexto
// LA funcion nos retornara el useContext creado 
export const useAuth = () => {
    return useContext(AuthContext);
}
