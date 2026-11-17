export default function DisplayWeather(props) {
  const { weather: {location, img, temperature, description} } = props;
  return (
    <div>
        <div>The weather in {location}</div>
        <img src= {img} id='icon'></img>
        <div>{temperature} and {description}</div>
    </div>
  )
}
