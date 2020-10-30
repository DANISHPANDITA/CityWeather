import React, { useState } from "react";
import "./App.css";
import { Helmet } from "react-helmet";
import Slide from "react-reveal/Slide";
import LightSpeed from "react-reveal/LightSpeed";

export default function App() {
  const [current, setcurrent] = useState(" ");
  const [city, setcity] = useState("");
  const [loc, setloc] = useState("");
  const [condition, setcondition] = useState("");
  const key = "36d69c3061774d3c88e43639202410";
  const handle = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
      .then((res) => res.json())
      .then((data) => {
        setcurrent(data.current);
        setloc(data.location);
        setcondition(data.current.condition);
        setcity("");
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>CityWeather</title>
        <meta name="title" content="Check_Weather" />
      </Helmet>
      <div className="App">
        <div className="input_field">
          <input
            placeholder="Search for any city..."
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
          <button disabled={!city} onClick={handle}>
            {" "}
            Click
          </button>
        </div>

        <div
          className={
            condition.text
              ? condition.text.includes("ain")
                ? "data"
                : current.temp_c >= 20
                ? "data--sunny"
                : "data--winter"
              : "local"
          }
        >
          <Slide bottom>
            <div className="temp">
              <h2>
                <i>{loc.name}</i>
              </h2>
              <img src={condition.icon} alt="" />
              <h1>{current.temp_c}</h1>
              <h3>
                <i>{condition.text}</i>
              </h3>
              <h3>
                <i>Precipitation (in mm) : </i>
                {current.precip_mm}
              </h3>
              <h3>
                <i>Humidity (in %) : </i>
                {current.humidity}
              </h3>
            </div>
          </Slide>
          <LightSpeed bottom>
            {current.last_updated && (
              <h3 className="lastUpdate">
                Last Updated At <small>{current.last_updated}</small>
              </h3>
            )}
          </LightSpeed>
          <Slide bottom>
            <div className="location">
              <h3>
                <i>State : </i>
                {loc.region}
              </h3>

              <h3>
                <i>Country : </i>
                {loc.country}
              </h3>
            </div>
          </Slide>
        </div>
      </div>
    </React.Fragment>
  );
}
