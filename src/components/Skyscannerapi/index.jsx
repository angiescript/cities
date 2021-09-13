import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Skyscannerapi = () => {
  const [cityId, setCityId] = useState("");

  const city = "london"; 

  const fetchAirportsByCity = async (city) => {
    const options = {
      method: "GET",
      url: "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/SE/",
      params: { query: `${city}` },
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .request(options)
      .then((response) => {
        setCityId(response.data.Places[0].CityId);
        console.log(cityId);
        fetchFlightsByCityId(cityId)

      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchFlightsByCityId = async (cityId) => {
    const options = {
      method: 'GET',
      url: 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/SE-sky/LOND-sky/anytime/anytime',
      headers: {
        'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com',
        'x-rapidapi-key': 'cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77'
      }
    };
    
    const request = await axios.request(options).then((response) => {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  };

  
  useEffect(() => {
    fetchAirportsByCity(city);
  }, []);

  return (
    <div>
      <h1> SkyScanner-API:</h1>
    </div>
  );
};

export default Skyscannerapi;
