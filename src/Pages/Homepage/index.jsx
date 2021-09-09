import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";

const Homepage = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const sendQuery = (e) => {
    e.preventDefault();
    history.push(query);
  };
  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <img src="https://via.placeholder.com/250"></img>

          <div>
            <h1>Cities!</h1>
            <p>A lot of cities. Great info.</p>
            <form onSubmit={sendQuery}>
              <input
                type="text"
                placeholder="Search for a city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
