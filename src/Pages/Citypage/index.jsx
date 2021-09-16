import React, { useState } from "react";
import styles from "./index.module.scss";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const Citypage = ({cityInfo}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);
  const [cityInfo, setCityInfo] = useState([]);
  let cityHeading = "Romance in the City of Lights";
  let cityDescription = "Paris, nicknamed the City of Light, is the capital city of France, and the largest city in France. The area is 105 square kilometres (41 square miles), and around 2.15 million people live there. If suburbs are counted, the population of the Paris area rises to 12 million people.The Seine river runs through the oldest part of Paris, and divides it into two parts, known as the Left Bank and the Right Bank. It is surrounded by many forests.";
    
    const url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
        origin: "*",
        action: "query",
        titles: cityName,
        format: "json",
        //prop: "extracts",
        //exsentences: "10",
        //exlimit: "1",
        //explaintext: "1",
        //formatversion: "2"
    });
    
    const request = axios
      .request(url)
      .then((response) => {
        //setCityInfo(response.data.query.pages[0].extract);
        console.log(response);
        return request;
      })
      .catch(function (error) {
        console.error(error);
      });
  
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
            <p> {cityInfo } </p>
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
