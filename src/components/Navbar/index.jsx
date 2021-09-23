import React from "react";
import styles from "./index.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import cityArray from "../../Pages/Homepage/cityArray";

const Navbar = () => {
  const randomCities = cityArray;
  const [randomCity, setRandomCity] = useState("");
  const history = useHistory();

  const generateRandomCity = () => {
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    setRandomCity(randomCity);
    history.push(`/${randomCity}`);
  };
  return (
    <div className={styles.navbar}>
      <i className="fas fa-globe" onClick={() => history.push("/")}></i>
      <p onClick={() => history.push("/")}>Home</p>

      <p onClick={() => generateRandomCity()}>Random City</p>
    </div>
  );
};

export default Navbar;
