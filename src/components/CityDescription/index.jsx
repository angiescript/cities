import React, { useState } from "react";
import styles from "./index.module.scss";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const CityDescription = ({cityInfo}) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);
  //const urlBase = 'https://en.wikipedia.org/w/rest.php/v1/page/';
  const urlBase = 'https://en.wikipedia.org/w/api.php?action=parse&page=`{}`&format=json'
  const [cityInfo, setCityInfo] = useState([]);

const url = "https://en.wikipedia.org/w/api.php?" +
new URLSearchParams({
    origin: "*",
    action: "query",
    titles: cityName,
    format: "json",
    //prop: "extracts",
    //exsentences: "10",
    //exlimit: "1",
    //explaintext: "1",
    //formatversion: "2"
});

const request = axios
  .request(url)
  .then((response) => {
    //setCityInfo(response.data.query.pages[0].extract);
    console.log(response);
    return request;
  })
  .catch(function (error) {
    console.error(error);
  });
  return(


    );
};

export default CityDescription;
