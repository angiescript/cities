import React from "react";
import { useHistory } from "react-router";
import styles from "./index.module.scss";

const BackButton = ({ url }) => {
  const history = useHistory();

  const handleClick = (url) => {
    console.log(url);
    history.push(url);
  };
  return (
    <div className={styles.backDiv}>
      <i className="fas fa-arrow-circle-left" onClick={() => handleClick(url)}></i>
    </div>
  );
};

export default BackButton;
