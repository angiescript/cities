import axios from "axios";
import { useRef, useState, useEffect } from "react";
import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";
import RandomCities from "../../components/RandomCities";

const Homepage = ({ setCityInfo }) => {
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [term, setTerm] = useState("");
  const [noCities, setNoCities] = useState(false);

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
          <RandomCities setCityInfo={setCityInfo} />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
