import React from 'react';
import styles from "./index.module.scss";

const Citypage = () => {
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
              <input type="text" />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Citypage;