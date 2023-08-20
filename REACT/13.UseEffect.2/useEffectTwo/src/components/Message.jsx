import React from "react";
import { useEffect } from "react";

const Message = () => {
  useEffect(() => {
    console.log("Me monto en el Dom");
    return () => {
      console.log("Me DESMONTO en el DOM");
    };
  }, []);
  return <h4>I'm IronMan</h4>;
};

export default Message;
