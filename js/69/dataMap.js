/*global google*/
const [{ Map, InfoWindow }, { AdvancedMarkerElement }] = await Promise.all([
        google.maps.importLibrary('maps'),
        google.maps.importLibrary('marker'),
    ]);
const mId = '63ec03057bfe91ae91221617';
const formElem = document.querySelector('#form');
const sidebarElem = document.querySelector('#sidebar');
const mapElem = document.querySelector('#map');
const map = new Map(mapElem, {
        center: { lat: 20, lng: 0 },
        zoom: 1,
        renderingType: 'VECTOR',
        mapId: mId
    });
const placesList = document.querySelector('#places');
const clearButton = document.querySelector('#clearButton');
const key = 'skriger';
const infoWindow = new InfoWindow();
let currentlySelectedSummary;
let bounds = new google.maps.LatLngBounds();

let markers = [];
const savedPlaces = JSON.parse(localStorage.getItem('placesHistory')) ?? [];
let placesHistory = savedPlaces ?? [];
savedPlaces.forEach(place => {
        placesList.append(createResultElement(place, place.thumbnail));
        addMarker(place, place.thumbnail);
        bounds.extend({lat: place.lat, lng: place.lng});
});

formElem.addEventListener('submit', async e => {
    e.preventDefault();
    const userInput = e.target.elements.q.value;
    const {geonames = []} = await wikiSearch(userInput) ?? {};
    sidebarElem.querySelectorAll('.error').forEach(el => el.remove());
    const thumbnails = await Promise.all(geonames.map(place => getThumbnail(place.wikipediaUrl)));
    geonames.forEach((place, i) => {
        const thumbnail = thumbnails[i];

        placesHistory.push({title: place.title, 
                            summary: place.summary, 
                            thumbnail: thumbnail, 
                            lat: place.lat, 
                            lng: place.lng});
        localStorage.setItem('placesHistory', JSON.stringify(placesHistory));

        placesList.prepend(createResultElement(place, thumbnail));
        addMarker(place, thumbnail);
        bounds.extend({lat: place.lat, lng: place.lng});
    });
    
    if (geonames.length) {
        map.fitBounds(bounds);
    }
});
async function wikiSearch(input) {
    try {
        const response = await fetch(`http://api.geonames.org/wikipediaSearch?q=${input}&maxRows=10&username=${key}&type=json`);
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            const result = await response.json();
            console.log(result);
            if (result.status) throw new Error(result.status.message);
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
    sidebarElem.prepend(p);
}
async function getThumbnail(wikipediaUrl) {
    const title = wikipediaUrl.split('/wiki/')[1];
    const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`);
    if (!r.ok) return null;
    return (await r.json()).thumbnail?.source ?? null;
}


function addMarker(result, thumbnail) {
    const img = document.createElement('img');
    img.className = 'marker-image';
    img.src = thumbnail;
    img.alt = result.title;
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
    markers.push(marker);
    marker.addEventListener('gmp-click', () => {
        console.log(marker, marker.content);
        panMap(result.lat, result.lng);
        const content = createInfoWindowContent(result);
        infoWindow.setContent(content);
        infoWindow.open({ anchor: marker });
    });
}
function createResultElement(result, thumbnail) {
    const placeLi = document.createElement('li');
    const wrapper = document.createElement('div');
    const title = document.createElement('h2');
    title.textContent = result.title;
    const summary = document.createElement('p');
    summary.textContent = result.summary;
    summary.className = 'summary';
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
    wrapper.className = 'wrapper';
    placeLi.append(wrapper);
    placeLi.className = 'placeLi';
    placeLi.addEventListener('click', () => {
        if (currentlySelectedSummary) {
            currentlySelectedSummary.classList.remove('active');
        }
        currentlySelectedSummary = summary;
        currentlySelectedSummary.classList.add('active');
        panMap(result.lat, result.lng);
    });
    return placeLi;
}
async function panMap(lat, lng) {
    map.setZoom(6);
    await doAfter(()=> map.panTo({lat, lng}), 1500);
    await doAfter(()=> map.setZoom(15), 1500);
}
function createInfoWindowContent(result) {
    const content = document.createElement('div');
    const title = document.createElement('h5');
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
function doAfter(action, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            action();
            resolve();
        }, delay);
    });
}
clearButton.addEventListener('click', () => {
    placesHistory = [];
    localStorage.setItem('placesHistory', JSON.stringify(placesHistory));
    markers.forEach(marker => marker.map = null);
    markers = [];
    placesList.replaceChildren();
    sidebarElem.querySelectorAll('.error').forEach(el => el.remove());
    currentlySelectedSummary = null;
    bounds = new google.maps.LatLngBounds();
    map.center = { lat: 20, lng: 0 };
    map.setZoom(1);
});