const currentUser = {
    name: sessionStorage.getItem("currentUser")
      ? sessionStorage.getItem("currentUser")
      : "",
  };
  
  
  export const setUser = (username) => {
    currentUser.name = username;
  };
  
  
  export const getUser = () => {
    return currentUser;
  };
  