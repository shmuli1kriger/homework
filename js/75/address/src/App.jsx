import Address from './Address';

function App() {
  const fields = ['street', 'city', 'state', 'zip'];
  const number = fields.length;
  const form = document.querySelector('#form');
  const streetElem = document.querySelector('#street');
  const cityElem = document.querySelector('#city');
  const stateElem = document.querySelector('#state');
  const zipElem = document.querySelector('#zip');
  let streetInput, cityInput, stateInput, zipInput;
  form.addEventListener('submit', e => {
    e.preventDefault();
    streetInput = streetElem.value;
    cityInput = cityElem.value;
    stateInput = stateElem.value;
    zipInput = zipElem.value;
  });
  return (
    <>
      <h1>Addresses</h1>
      <h3>Please enter the following {number} fields:</h3>
      <h3>{fields.join(', ')}</h3>
      <Address street="101 Main Street" city="Lakewood" state="NJ" zip="08701"/>
    </>
  )
}

export default App
