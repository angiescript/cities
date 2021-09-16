import axios from "axios";
import { useState } from "react";
import React from "react";
import styles from "./index.module.scss";
import { useHistory } from "react-router-dom";


const Homepage = () => {
  const history = useHistory();
  const [cities, setCities] = useState([]);
  const [term, setTerm] = useState("");
  const apiKey = "5ae2e3f221c38a28845f05b6196740bc06611b2480aad45795c80cd7";
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

    const request = await axios
      .request(options)
      .then((response) => {
        setCities(response.data.data);
        console.log(response.data.data);
        return request;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(term);
    console.log(term);
    history.push(term);
  };

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <img src="https://via.placeholder.com/250"></img>

          <div>
            <h1>Cities!</h1>
            <p>A lot of cities. Great info.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for a city"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className={styles.featuredCity}>
          <img src="https://via.placeholder.com/400x250"></img>
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
          <div className={styles.otherCitiesHeader}>
            <h3>Other cities you might be interested in</h3>
            
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos molestiae facilis voluptate aliquid
              esse magni distinctio eveniet optio deleniti. Recusandae alias pariatur omnis natus distinctio optio
              maxime facilis nostrum nulla?
            </p>
          </div>
          <div className={styles.otherCitiesThumbContainer}>
            <div className={styles.otherCitiesThumb}>
              <img src="https://via.placeholder.com/100"></img> Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Non culpa voluptates iure illo fugiat nulla,
            </div>
            <div className={styles.otherCitiesThumb}>
              {" "}
              <img src="https://via.placeholder.com/100"></img>
            </div>
            <div className={styles.otherCitiesThumb}>
              {" "}
              <img src="https://via.placeholder.com/100"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
