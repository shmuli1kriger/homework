const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker'),
    ]);
const formElem = document.querySelector('#form');
const asideElem = document.querySelector('#aside');
const mapElem = document.querySelector('#map');
const map = createMap();
let thumbnail;
const bounds = new google.maps.LatLngBounds();
formElem.addEventListener('submit', async e => {
    e.preventDefault();
    asideElem.style.display = 'block';
    const userInput = e.target.elements.q.value;
    console.log(userInput);
    const searchResult = await wikiSearch(userInput);
    const first = searchResult?.geonames?.[0];
    if (!first) {
        showMessage('No results found.');
        return;
    }
    thumbnail = await getThumbnail(first.wikipediaUrl);
    asideElem.querySelectorAll('.error').forEach(el => el.remove());
    asideElem.append(createResultElement(first, thumbnail));
    const location = {lat: first.lat, lng: first.lng};
    console.log(location);
    map.setCenter(location);
    map.setZoom(14);
    mapElem.style.display = 'block';
    addMarker(first);
    bounds.extend(location);
    map.fitBounds(bounds);
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
        showMessage(e.message);
    }
}
function showMessage(text) {
    const p = document.createElement('p');
    p.className = 'error';
    p.style.color = 'red';
    p.textContent = text;
    asideElem.append(p);
}
async function getThumbnail(wikipediaUrl) {
    const title = wikipediaUrl.split('/wiki/')[1];
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if (!r.ok) return null;
    return (await r.json()).thumbnail?.source ?? null;
}
function createMap() {
    return new Map(mapElem, {
        center: { lat: 20, lng: 0 },
        zoom: 2,
        renderingType: 'VECTOR',
        mapId: 'DEMO_MAP_ID'
    });
}
function addMarker(result) {
    const img = document.createElement('img');
    img.src = thumbnail ?? '';
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.borderRadius = '50%';

    const marker = new AdvancedMarkerElement({
            map,
            position: { lat: result.lat, lng: result.lng},
            title: result.title,
            gmpClickable: true,
            content: thumbnail ? img : undefined
        });

    const infoWindow = new InfoWindow({
        content: ''
    });
    marker.addEventListener('gmp-click', () => {
        console.log(marker, marker.content);
        panMap(result.lat, result.lng);
        const content = createInfoWindowContent(result);
        infoWindow.setContent(content);
        infoWindow.open({ anchor: marker });
    });
}
function createResultElement(result, thumbnail) {
    const wrapper = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = result.title;
    const summary = document.createElement('p');
    summary.textContent = result.summary;
    const wikiLink = document.createElement('a');
    wikiLink.href = `https://${result.wikipediaUrl}`;
    wikiLink.target = '_blank';
    wikiLink.rel = 'noopener noreferrer';
    wikiLink.textContent = 'Read more...';
    const hr = document.createElement('hr');
    wrapper.append(title);
    if (thumbnail) {
        const img = document.createElement('img');
        img.src = thumbnail;
        wrapper.append(img);
    }
    wrapper.append(summary);
    wrapper.append(wikiLink);
    wrapper.append(hr);
    wrapper.addEventListener('click', () => {
        panMap(result.lat, result.lng);
    });
    return wrapper;
}
function createInfoWindowContent(result) {
    const content = document.createElement('div');
    const title = document.createElement('h1');
    title.textContent = result.title;
    const summary = document.createElement('p');
    summary.textContent = result.summary;
    const link = document.createElement('a');
    link.href = `https://${result.wikipediaUrl}`;
    link.textContent = 'Read more on Wikipedia';
    link.target = '_blank';
    link.rel = 'noopener';
    content.append(title, summary, link);
    return content;
}
function panMap(lat, lng) {
    map.panTo({lat, lng});
    map.setZoom(14);
}