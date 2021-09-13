import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Skyscannerapi = () => {
  const [airPorts, setAirPorts] = useState([]);
  const [selectAirport, setSelectAirport] = useState("");

  const city = "paris";

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
        setAirPorts(response.data.Places);
        console.table(airPorts);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchFlightsByAirport = async (airportName) => {
    var options = {
      method: "GET",
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/SE-sky/${airportName}/anytime/anytime`,
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectAirport);
    fetchFlightsByAirport(selectAirport);
  };

  useEffect(() => {
    fetchAirportsByCity(city);
  }, []);

  return (
    <div>
      <h1> SkyScanner-API:</h1>
      <h3>Välj till vilken flygplats du vill resa till </h3>
      <form onSubmit={handleSubmit}>
        <select
          name="airport"
          id="airport"
          onChange={(e) => setSelectAirport(e.target.value)}
        >
          {airPorts.map((airport) => (
            <option key={airport.PlaceId} value={airport.PlaceId}>
              {airport.PlaceName}
            </option>
          ))}
        </select>
        <button>Välj</button>
      </form>
    </div>
  );
};

export default Skyscannerapi;
