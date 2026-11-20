import { useState, useEffect } from "react";
export default function Conversion({currentFrom, currentTo, currentAmount}) {
    const [rate, setRate] = useState({});
    useEffect(() => {
        if (!currentFrom || !currentTo || currentFrom === currentTo) return;
        (async ()=> {
          try { 
              const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${currentFrom}&symbols=${currentTo}`);
              if (!response.ok) {
                  throw new Error(`${response.status} - ${response.statusText}`);
              }
              const result = await response.json();
              console.log(result);
              setRate(result);
          } catch(e) {
              console.error(e);
          } 
        })();
      }, [currentFrom, currentTo]);
  return (
    <div id="result">
      {!currentFrom || !currentTo
        ? ""
        : currentFrom === currentTo
        ? currentAmount
        : rate.rates?.[currentTo] !== undefined
          ? `${currentAmount} ${currentFrom} = ${(currentAmount * rate.rates[currentTo]).toFixed(2)} ${currentTo}`
          : "..."}
    </div>
  )
}
