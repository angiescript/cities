import React, { useState } from "react";
import styles from "./index.module.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import Currency from "../../components/Currency";
import Weather from "../../components/Weather";
import CityDescription from "../../components/CityDescription";

const Citypage = ({ cityInfo }) => {
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);
  let cityHeading = "Lorem ipsum dolor sit amet";
  let cityDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra risus at metus accumsan eleifend. Nullam sit amet nulla in erat pulvinar luctus vitae eu lorem. Pellentesque nec ultricies nunc, vel efficitur lorem. Fusce facilisis velit id turpis mattis imperdiet vel ac dolor. Fusce quis venenatis erat. Etiam rutrum elementum.";

  console.log(cityInfo);

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <div>
            <img src={imageUrl} alt="" />
          </div>
          <div className={styles.cityInfo}>
            <Weather query={cityName} lon={cityInfo.longitude} lat={cityInfo.latitude} open={weatherOpen} />
            <h1>{cityName}</h1>
            {/* <h2>{cityHeading}</h2> */}
            <CityDescription query={cityName} setImageUrl={setImageUrl} />
            {/* <p>{cityDescription}</p> */}
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
          <Currency cityInfo={cityInfo} />
          <button onClick={() => history.push("/")}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default Citypage;
