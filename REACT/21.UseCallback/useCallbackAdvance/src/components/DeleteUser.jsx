import { memo } from "react";

const DeleteUser = memo(({ deleteUser }) => {
  console.log("Me renderizo una vez");
  return <button onClick={deleteUser}>Delete User</button>;
});

export default DeleteUser;
