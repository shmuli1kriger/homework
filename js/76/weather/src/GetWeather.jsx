import { useEffect, useState } from 'react';
import DisplayWeather from './DisplayWeather';
import NoWeather from './NoWeather';

export default function GetWeather() {
    const zip = '08701';
    const [weather, setWeather] = useState(null);
    useEffect(() => {
    (async ()=> {
      try {
            const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=fd4bb24495e0472f74a17bc41a4556b7&units=imperial`);
            const weatherData = await r.json();
            if(!r.ok) {
                throw new Error (`${r.status} - ${r.statusText} - ${weatherData.message}`);
            }
            setWeather({
                location: weatherData.name,
                img: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
                temperature: weatherData.main.temp,
                description: weatherData.weather[0].description
            });


        } catch(e) {
            console.error('oops', e);
        }
    })();
  }, [zip]);
  return weather ? <DisplayWeather weather={weather}/> : <NoWeather/>;

}
