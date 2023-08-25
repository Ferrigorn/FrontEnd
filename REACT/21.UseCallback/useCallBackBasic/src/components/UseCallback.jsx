import { useState } from "react";
import { useCallback } from "react";
import React from "react";


const Button = React.memo(({ handleClick, name }) => {
  console.log(`${name} renderizado`);
  return <button onClick={handleClick}>{name}</button>;
});

const Counter = () => {
  console.log("counter renderizado");
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const memoizedSetCountOne = useCallback(
    () => setCountOne(countOne + 1),
    [countOne]
  );
  const memoizedSetCountTwo = useCallback(
    () => setCountTwo(countTwo + 1),
    [countTwo]
  );

  return (
    <>
      {countOne} {countTwo}
      <Button handleClick={memoizedSetCountOne} name="button 1" />
      <Button handleClick={memoizedSetCountTwo} name="button 2" />
    </>
  );
};

export default Counter
