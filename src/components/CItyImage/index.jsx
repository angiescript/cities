import axios from "axios";
import React, { useEffect, useState } from "react";

const CityImage = ({ query }) => {
  const [imgUrl, setImgUrl] = useState("");
  const apiKey = "_HAJPC5ymM2byCi3nalnSyfoLXw16kRSSeOjaFTM9WU";

  useEffect(() => {
    const getData = async () => {
      try {
        const getPhoto = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${apiKey}`);
        console.log(getPhoto.data);
        setImgUrl(getPhoto.data.results[0].urls.small);
      } catch (error) {
        console.dir(error);
      }
    };

    getData();
  }, []);

  return (
    <div id="map">
      <img src={imgUrl} alt={query} />
    </div>
  );
};

export default CityImage;
