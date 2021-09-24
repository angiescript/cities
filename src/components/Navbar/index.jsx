import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";

import cityArray from "../../Pages/Homepage/cityArray";
import axios from "axios";

const Navbar = ({ cityInfo, setCityInfo }) => {
  const randomCities = cityArray;
  const history = useHistory();

  const fetchData = async (query) => {
    var options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        minPopulation: "500",
        namePrefix: `${query}`,
        sort: "-population ",
        languageCode: "en",
        types: "CITY",
      },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        setCityInfo(response.data.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const generateRandomCity = async () => {
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    await fetchData(randomCity);
  };

  useEffect(() => {
    if (cityInfo) {
      history.push(`/${cityInfo.city}`);
    }
  }, [cityInfo]);

  return (
    <div className={styles.navbar}>
      <i className="fas fa-globe" onClick={() => history.push("/")}></i>
      <p onClick={() => history.push("/")}>Home</p>

      <p onClick={() => generateRandomCity()}>Random City</p>
    </div>
  );
};

export default Navbar;
