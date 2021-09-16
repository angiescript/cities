import React from "react";
import styles from "./index.module.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import Weather from "../../components/Weather";

const Citypage = (cityInfo) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);
  let cityHeading = "Romance in the City of Lights";
  let cityDescription =
    "Paris, nicknamed the City of Light, is the capital city of France, and the largest city in France. The area is 105 square kilometres (41 square miles), and around 2.15 million people live there. If suburbs are counted, the population of the Paris area rises to 12 million people.The Seine river runs through the oldest part of Paris, and divides it into two parts, known as the Left Bank and the Right Bank. It is surrounded by many forests.";

  const lat = cityInfo.latitude;

  console.log(cityInfo);

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <div>
            <img src="https://via.placeholder.com/500x200" alt="" />
          </div>
          {/* <Weather query={cityName} /> */}
          <div className={styles.cityInfo}>
            <h1>{cityName}</h1>
            <h2>{cityHeading}</h2>
            <p>{cityDescription}</p>
          </div>

          <h2>What do you want to know more about?</h2>
          <div className={styles.additionalInfoBanner}>
            <div className={styles.weatherInfo}>
              <img src="https://via.placeholder.com/50x50" alt="" />
              <button>Weather in {cityName}</button>
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
          <button onClick={() => history.push("/")}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Citypage;
