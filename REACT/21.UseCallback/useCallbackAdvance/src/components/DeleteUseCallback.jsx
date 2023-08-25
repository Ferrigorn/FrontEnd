import { useCallback } from "react";
import { useState } from "react";
import DeleteUser from "./DeleteUser";

const DeleteUseCallback = () => {
  const [user, setUser] = useState({ name: "Albert", lastName: "Rivera" });

  const deleteUserCallback = useCallback(() => {
    setUser({ name: "", lastName: "" });
  }, []);

  return (
    <>
      <h3>
        {user.name} / {user.lastName}
      </h3>
      <input
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        value={user.lastName}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />

      <DeleteUser deleteUser={deleteUserCallback}>Reset Name</DeleteUser>
    </>
  );
};

export default DeleteUseCallback;
