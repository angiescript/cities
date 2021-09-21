import React from "react";
import styles from "./index.module.scss";
import {Link} from 'react-router-dom';
import {useState} from "react";
import cityArray from "../../Pages/Homepage/cityArray";


const Navbar = () => {
  const randomCities = cityArray;
  const [randomCity, setRandomCity] = useState([]);
    
  const generateRandomCity = () =>{
    const randomCity = randomCities[Math.floor(Math.random() * (randomCities.length + 1))];
    setRandomCity(randomCity);
  };
  return (
    <div className={styles.navbar}>
     <div className="navbar">
        <Link to={"/"}>
        <h4>Home</h4>
        </Link>
        <div className="links">
          <Link className="randomCity" to={`/${randomCity}`}>
          <button onClick ={generateRandomCity}>random city</button>
          </Link>
        </div>
      </div>
    </div>
  ); 
};

export default Navbar;
