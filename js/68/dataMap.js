const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker'),
    ]);
const formElem = document.querySelector('#form');
const summaryDataElem = document.querySelector('#summaryData');

formElem.addEventListener('submit', async e => {
    e.preventDefault();
    const userInput = e.target.elements.q.value;
    console.log(userInput);
    const searchResult = await wikiSearch(userInput);
    const first = searchResult?.geonames?.[0];
    summaryDataElem.innerText = first ? first.summary : 'No results found.';
    const location = {lat: first.lat, lng: first.lng};
    console.log(location);
    createMap(location);
});
async function wikiSearch(input) {
    try {
        const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input}&maxRows=10&username=skriger&type=json`);
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            const result = await response.json();
            console.log(result);
            return result;
    } catch (e) {
        console.error(e);
    }
}
function createMap(location) {
    const map = new Map(document.querySelector('#map'), {
        center: location,
        zoom: 14,
        renderingType: 'VECTOR',
        mapId: 'DEMO_MAP_ID'
    });
}