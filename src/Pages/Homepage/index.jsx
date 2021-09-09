import axios from "axios";
import { useState } from "react";
import React from "react";
import styles from "./index.module.scss";

const Homepage = () => {

  const [cities, setCities] = useState([]);
  const [term, setTerm] = useState("");

  const fetchData = async (query) => {
    
    var options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        minPopulation: "500",
        namePrefix: `${query}`,
        sort: "-population ",
        languageCode: "en",
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
  };

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <div>
            <img src="https://via.placeholder.com/300x150" alt="" />
          </div>
          <div>
            <h1>Cities!</h1>
            <p>A lot of cities. Great info.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
