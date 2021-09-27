import React, { useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const CityDescription = ({ cityInfo }) => {
  const cityName = cityInfo.city;
  const [CityDescription, setCityDescription] = useState([]);

  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      origin: "*",
      action: "query",
      titles: cityName,
      format: "json",
      prop: "extracts|pageimages",
      exsentences: "10",
      exlimit: "1",
      explaintext: "1",
      formatversion: "2",
    });

  const request = axios
    .request(url)
    .then((response) => {
      setCityDescription(response.data.query.pages[0].extract);
      return request;
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div>
      <p>{CityDescription}</p>
    </div>
  );
};

export default CityDescription;
