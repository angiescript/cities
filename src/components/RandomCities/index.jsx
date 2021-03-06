import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import cityArray from "../../Pages/Homepage/cityArray";
import styles from "./index.module.scss";
import CityImage from "../CityImage";
import { combineClasses } from "../../utils";

const RandomCities = ({ setCityInfo }) => {
  const numbersArray = useRef([]);
  const index = useRef(0);
  const randomCity = cityArray;
  const randomCities = useRef([]);
  const [finalRandomArray, setFinalRandomArray] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (!!randomCity.length) {
      const fetchRandomcity = async (city) => {
        var options = {
          method: "GET",
          url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
          params: {
            minPopulation: "500",
            namePrefix: city,
            sort: "-population ",
            languageCode: "en",
            types: "CITY",
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": "12c8f6f075msh6a2c8f1f1de64b6p18b1bejsn5144d13d70a6",
          },
        };

        await axios
          .request(options)
          .then((response) => {
            randomCities.current = [response.data.data[0], ...randomCities.current];
          })
          .catch(function (error) {
            console.error(error);
          });

        if (index.current < 2) {
          setTimeout(() => {
            index.current = index.current + 1;
            fetchRandomcity(randomCity[createRandomNumber()]);
          }, 1500);
        } else {
          setFinalRandomArray([...randomCities.current]);
        }
      };

      const createRandomNumber = () => {
        let randomNumber = Math.floor(Math.random() * randomCity.length);
        if (numbersArray.current.indexOf(randomNumber) !== -1) {
          createRandomNumber();
        } else {
          numbersArray.current = [randomNumber, ...numbersArray.current];
          return randomNumber;
        }
      };

      fetchRandomcity(randomCity[createRandomNumber()]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (city) => {
    setCityInfo(city);
    history.push(city.city);
  };

  return (
    <>
      {!finalRandomArray.length && (
        <div className={styles.loading}>
          <p>Loading</p>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      )}

      {!!finalRandomArray.length &&
        finalRandomArray.map((city) => (
          <div
            className={combineClasses(styles.eachCity, !!finalRandomArray && styles.contentLoaded)}
            onClick={() => handleClick(city)}
            key={city.city}
          >
            <CityImage query={city.city} size={"regular"} />
            <p>{city.city}</p>
          </div>
        ))}
    </>
  );
};

export default RandomCities;
