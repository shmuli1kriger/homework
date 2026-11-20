import './App.css'
import Conversion from './Conversion';
import Header from './Header'
import { useEffect, useState } from 'react'

export default function App() {
  const [currencyList, setCurrencyList] = useState({});
  const [currentFrom, setCurrentFrom] = useState("");
  const [currentTo, setCurrentTo] = useState("");
  const [currentAmount, setCurrentAmount] = useState(1);
  useEffect(() => {
    (async ()=> {
      try { 
          const response = await fetch('https://api.frankfurter.dev/v1/currencies');
          if (!response.ok) {
              throw new Error(`${response.status} - ${response.statusText}`);
          }
          const result = await response.json();
          console.log(result);
          setCurrencyList(result);
      } catch(e) {
          console.error(e);
      } 
    })();
  }, []);
  
  return (
    <>
      <Header/>
      <div id='amountInput'>
        <label htmlFor="amount">Enter amount:</label>
        <input type="number" name="amount" id="amount" value={currentAmount} onChange={e => setCurrentAmount(e.target.value)}/>
      </div>
      <br/>
      <div id='fromInput'>
        <label htmlFor="fromCurrencies">From:</label>
        <select id="fromCurrencies" value={currentFrom} onChange={e => setCurrentFrom(e.target.value)}>
            <option value="" hidden>select a currency</option>
            {Object.entries(currencyList).map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
        </select>
      </div>
      <br/>
      <div id='toInput'>
        <label htmlFor="toCurrencies">To:</label>
        <select id="toCurrencies" value={currentTo} onChange={e => setCurrentTo(e.target.value)}>
            <option value="" hidden>select a currency</option>
            {Object.entries(currencyList).map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
        </select>
      </div>
      <Conversion currentFrom={currentFrom} currentTo={currentTo} currentAmount={currentAmount}/>
    </>
  )
}
