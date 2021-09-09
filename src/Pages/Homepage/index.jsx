import React from "react";
import styles from "./index.module.scss";

const Homepage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          
<img src="https://via.placeholder.com/250"></img>

          <div>
            <h1>Cities!</h1>
            <p>A lot of cities. Great info.
              dfsdfsdfsdf
            </p>
            <input type="text" placeholder="Search city"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
