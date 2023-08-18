import { useState } from "react";
import "./ObjectState.css";

const ObjectState = () => {
  const [personInfo, setPersonInfo] = useState({
    name: "Larry",
    lastName: "Molongui",
  });
  return (
    <>
      <h4>
        {personInfo.name} | {personInfo.lastName}
      </h4>
      <input
        type="text"
        value={personInfo.name}
        onChange={(e) => setPersonInfo({ ...personInfo, name: e.target.value })}
      />
      <input
        type="text"
        value={personInfo.lastName}
        onChange={(e) =>
          setPersonInfo({ ...personInfo, lastName: e.target.value })
        }
      />
    </>
  );
};

export default ObjectState;
