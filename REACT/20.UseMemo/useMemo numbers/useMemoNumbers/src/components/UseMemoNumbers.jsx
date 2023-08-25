import { useMemo, useState } from "react";

const numberArray = [1, 3, 7, 8, 6];

const mapScores = (scores, caller) => {
  console.log("invocamos mapScore =>", caller);

  return scores.map((num, index) => {
    const calc = (num * 3) / 2;
    const color = calc < 3 ? "👶" : "👴";

    return (
      <p key={index}>
        {calc} {color}
      </p>
    );
  });
};

const BasicUseMemo = () => {
  const [rerender, setRerender] = useState(false);

  const marksContent = mapScores(numberArray, "no-memo"); //Lo renderiza sin tener en cuenta si los valores han cambiado o no

  const marksContentMemo = useMemo(() => { //no lo vuelve a renderizar porque los valores no han cambiado
    return mapScores(numberArray, "memo");
  }, []);

  return (
    <div className="rows">
      <div>
        <h3>No Memo</h3> {marksContent}
      </div>

      <div>
        <h3>Sí Memo</h3> {marksContentMemo}
      </div>

      <button onClick={() => setRerender(!rerender)}>Rerender</button>
    </div>
  );
};

export default BasicUseMemo;