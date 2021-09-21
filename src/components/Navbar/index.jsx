import React from "react";
import styles from "./index.module.scss";
import {Link} from 'react-router-dom';


const Navbar = () => {
  const randomCity = "London"
  return (
    <div className={styles.navbar}>
     <div className="navbar">
        <Link to={"/"}>
        <h4>Home</h4>
        </Link>
        <div className="links">
          <Link className="randomCity" to={`/${randomCity}`}>
          <button>random city</button>
          </Link>
        </div>
      </div>
    </div>
  ); 
};

export default Navbar;
