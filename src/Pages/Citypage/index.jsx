import React from "react";
import styles from "./index.module.scss";
import { useHistory, useParams } from "react-router-dom";
import Currency from "../../components/Currency";

const Citypage = () => {
  const history = useHistory();
  const cityName = useParams().query;
  let cityHeading = "Romance in the City of Lights";
  let cityDescription =
    "Paris, nicknamed the City of Light, is the capital city of France, and the largest city in France. The area is 105 square kilometres (41 square miles), and around 2.15 million people live there. If suburbs are counted, the population of the Paris area rises to 12 million people.The Seine river runs through the oldest part of Paris, and divides it into two parts, known as the Left Bank and the Right Bank. It is surrounded by many forests.";

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <div>
            <img src="https://via.placeholder.com/500x200" alt="" />
          </div>

          <div className={styles.cityInfo}>
            <h1>{cityName}</h1>
            <h2>{cityHeading}</h2>
            <p>{cityDescription}</p>
          </div>
          <Currency/>
          <h2>What do you want to know more about?</h2>
          <div className={styles.additionalInfoBanner}>
            <div className={styles.weatherInfo}>
              <img src="https://via.placeholder.com/50x50" alt="" />
              <h3>Weather in {cityName}</h3>
              <p>Click here to see upcoming weather forecasts for {cityName}.</p>
            </div>

            <div className={styles.sightsInfo}>
              <img src="https://via.placeholder.com/50x50" alt="" />
              <h3>Sights in {cityName}</h3>
              <p>Click here to read more about sights in {cityName}.</p>
            </div>

            <div className={styles.flightsInfo}>
              <img src="https://via.placeholder.com/50x50" alt="" />
              <h3>Flights to {cityName}</h3>
              <p>Click here to find your flight to {cityName}.</p>
            </div>
          </div>
          <button onClick={() => history.push("/")}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Citypage;
