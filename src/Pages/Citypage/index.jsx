import React, { useState } from "react";
import styles from "./index.module.scss";
import { useHistory, useParams } from "react-router-dom";
import Currency from "../../components/Currency";
import Weather from "../../components/Weather";
import CityDescription from "../../components/CityDescription";
import CityImage from "../../components/CityImage";
import BackButton from "../../components/BackButton";

const Citypage = ({ cityInfo }) => {
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const history = useHistory();
  const cityName = cityInfo.city;

  if (!cityInfo) return <>no data</>;

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <BackButton url={"/"} />
          <div className={styles.cityDesc}>
            <CityImage query={cityName} size={"small"} />
            <h1>{cityName}</h1>
            <CityDescription cityInfo={cityInfo} />
          </div>
          <div className={styles.cityInfo}>
            <Weather query={cityName} lon={cityInfo.longitude} lat={cityInfo.latitude} open={weatherOpen} />
            <Currency cityInfo={cityInfo} open={currencyOpen} />
            
            
          </div>

          <div className={styles.additionalInfoBanner}>
            <h2>More information about {cityName}</h2>
            <div className={styles.infoBoxes}>
              <div className={styles.moreInfoDiv} onClick={() => setWeatherOpen(!weatherOpen)}>
                <i className="fas fa-cloud-sun"></i>
                <h3>Weather in {cityName}</h3>
                <p>Click here to see upcoming weather forecasts for {cityName}.</p>
              </div>

              <div className={styles.moreInfoDiv} onClick={() => history.push(`/${cityName}/sights`)}>
                <i className="fas fa-landmark"></i>
                <h3>Sights in {cityName}</h3>
                <p>Click here to see sights</p>
              </div>

              <div className={styles.moreInfoDiv} onClick={() => history.push(`/${cityName}/flights`)}>
                <i className="fas fa-plane-departure"></i>
                <h3>Flights to {cityName}</h3>

                <p>Click here to see flights</p>
              </div>
              <div className={styles.moreInfoDiv} onClick={() => setCurrencyOpen(!currencyOpen)}>
                <i className="fas fa-dollar-sign"></i>
                <h3>Currency for {cityName}</h3>

                <p>Click here to see exchange rates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citypage;
