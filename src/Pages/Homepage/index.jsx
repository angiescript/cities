import axios from "axios";
import { useRef, useState, useEffect } from "react";
import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";
import cityArray from "./cityArray";
import CityImage from "../../components/CItyImage";

const Homepage = ({ setCityInfo }) => {
  const index = useRef(0);
  const randomCity = cityArray;
  const randomCities = useRef([]);
  const [finalRandomArray, setFinalRandomArray] = useState([]);
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [term, setTerm] = useState("");
  const [noCities, setNoCities] = useState(false);
  const numbersArray = useRef([]);

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
        setCities(response.data.data);
        setCityInfo(response.data.data[0]);

        if (response.data.data.length > 0) {
          setNoCities(false);
        } else setNoCities(true);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (term.length > 1) {
      const timeoutId = setTimeout(() => {
        fetchData(term);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const handleClick = (city) => {
    setCityInfo(city);
    history.push(city.city);
  };

  const renderDropdown = () => {
    if (noCities && term.length < 1) {
      setNoCities(false);
      return <></>;
    } else if (noCities) {
      return <li>Sorry, no results</li>;
    }

    return cities.map((city) => {
      if (term < 1) setCities([]);

      if (cities.length >= 1) {
        return (
          <li key={city.id} onClick={() => handleClick(city)}>
            {city.name} <p>({city.country})</p>
          </li>
        );
      } else return null;
    });
  };

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
            "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
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
  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <img src="https://via.placeholder.com/250" alt="placeholder" />

          <div>
            <h1>Cities!</h1>
            <p>A lot of cities. Great info.</p>
            <form>
              <input
                spellCheck="false"
                type="text"
                placeholder="Search for a city"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
            <div className={styles.searchResults}>
              <ul>{renderDropdown()}</ul>
            </div>
          </div>
        </div>
        <div className={styles.featuredCity}>
          <img src="https://via.placeholder.com/400x250" alt="poster" />
          <div className={styles.featuredCityTextbox}>
            <h1>Featured city!</h1>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque labore facilis perferendis adipisci amet
              expedita tempore sapiente accusamus incidunt ab voluptates commodi quis quos, nemo consequatur autem aut
              fugiat est!
            </p>
          </div>
        </div>
        <div className={styles.otherCities}>
          {randomCities.map((city) => (
            <div className={styles.eachCity} onClick={() => handleClick(city)}>
              <CityImage query={city.city}/>
              <p>{city.city}</p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
