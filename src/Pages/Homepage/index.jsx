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
          <div>
            <img src="https://via.placeholder.com/300x150" alt="" />
          </div>
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
      </div>
    </div>
  );
};

export default Homepage;
