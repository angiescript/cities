import axios from "axios";
import { useRef, useState, useEffect } from "react";
import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";
import RandomCities from "../../components/RandomCities";
import CityImage from "../../components/CityImage";
import { combineClasses } from "../../utils";

const Homepage = ({ setCityInfo }) => {
  const history = useHistory();

  const [cities, setCities] = useState([]);
  const [term, setTerm] = useState("");
  const [noCities, setNoCities] = useState(false);
  const [onSubmitCity, setOnSubmitCity] = useState([]);

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
        setOnSubmitCity(response.data.data[0]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setCityInfo(onSubmitCity);
    history.push(onSubmitCity.city);
  };

  const renderDropdown = () => {
    if (noCities && term.length < 1) {
      setNoCities(false);
      return <></>;
    } else if (noCities) {
      return <li className={styles.noResults}>Sorry, no results</li>;
    }

    return cities.map((city) => {
      if (term < 1) setCities([]);

      if (cities.length >= 1) {
        return (
          <li key={city.id} onClick={() => handleClick(city)}>
            <span className={styles.name}>{city.name}</span>
            <span className={styles.country}>({city.country})</span>
          </li>
        );
      } else return null;
    });
  };

  const scrollOnClick = () => {
    window.scrollTo({
      top: window.innerHeight - 65,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.heroDiv}>
        <div className={styles.heroImage}>
          <CityImage query={"city skyline"} size={"full"} />
        </div>
        <div className={styles.overlay} />

        <div className={styles.banner}>
          <div className={styles.headline}>
            <h1>Cities!</h1>
            <p>Great cities. Questionable info.</p>
          </div>
          <div className={styles.searchDiv}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                className={combineClasses(styles.input, cities.length && styles.removeBorderRadius)}
                spellCheck="false"
                type="text"
                placeholder="Search for a city..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
            <div className={styles.searchResults}>
              <ul>{renderDropdown()}</ul>
            </div>
          </div>
          <div className={styles.scrollDownContainer} onClick={() => scrollOnClick()}>
            Featured Cities
            <i className={combineClasses("fas fa-chevron-down", styles.scrollDownIcon)}></i>
          </div>
        </div>
      </div>

      <div className={styles.featuredCities}>
        <h1>Featured Cities</h1>
        <div className={styles.cardsDiv}>
          <RandomCities setCityInfo={setCityInfo} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
