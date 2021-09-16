import React, { useState } from "react";
import styles from "./index.module.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import Weather from "../../components/Weather";

const Citypage = ({ cityInfo }) => {
  const [weatherOpen, setWeatherOpen] = useState(false);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);
  let cityHeading = "Romance in the City of Lights";
  let cityDescription =
    "Paris, nicknamed the City of Light, is the capital city of France, and the largest city in France. The area is 105 square kilometres (41 square miles), and around 2.15 million people live there. If suburbs are counted, the population of the Paris area rises to 12 million people.The Seine river runs through the oldest part of Paris, and divides it into two parts, known as the Left Bank and the Right Bank. It is surrounded by many forests.";

  console.log(cityInfo);

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <div>
            <img src="https://via.placeholder.com/500x200" alt="" />
          </div>
          <div className={styles.cityInfo}>
            <Weather query={cityName} lon={cityInfo.longitude} lat={cityInfo.latitude} open={weatherOpen} />
            <h1>{cityName}</h1>
            <h2>{cityHeading}</h2>
            <p>{cityDescription}</p>
          </div>

          <div className={styles.additionalInfoBanner}>
            <h2>More information about {cityName}</h2>
            <div className={styles.infoBoxes}>
              <div className={styles.weatherInfo} onClick={() => setWeatherOpen(!weatherOpen)}>
                <img src={`http://openweathermap.org/img/wn/01d.png`} alt="" />
                <h3>Weather in {cityName}</h3>
                <p>Click here to see upcoming weather forecasts for {cityName}.</p>
              </div>

              <div className={styles.sightsInfo}>
                <img src="https://via.placeholder.com/50x50" alt="" />
                <Link to={`/${cityName}/sights`}>
                  <button>Sights in {cityName}</button>
                </Link>
              </div>

              <div className={styles.flightsInfo}>
                <img src="https://via.placeholder.com/50x50" alt="" />
                <Link to={`/${cityName}/flights`}>
                  <button>Flights to {cityName}</button>
                </Link>
              </div>
            </div>
          </div>
          <button onClick={() => history.push("/")}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Citypage;
