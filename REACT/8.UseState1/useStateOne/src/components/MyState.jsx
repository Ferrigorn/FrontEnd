import { useState } from "react";
import "./MyState.css";

const MyState = () => {
  const [myName, setMyName] = useState("Larry Molongui");

  return (
    <>
      <h1>{myName}</h1>
      <input
        type="text"
        value={myName}
        onChange={(e) => setMyName(e.target.value)}
      />
    </>
  );
};

export default MyState;