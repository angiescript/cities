import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Skyscannerapi = () => {
  const city = "London";

  const [quotes, setQuotes] = useState([]);
  const [flightData, setFlightData] = useState([]);

  // Fetch request with "searchTerm (london)", to access 'cityId'
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
        // console.table(response.data.Places); // Airports in with term "london"
        // console.log(response.data.Places[0].CityId); // first object is "CityId"
        fetchFlightsByCityId(response.data.Places[0].CityId);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Fetch request with 'cityId', to search flights including all airports in london
  const fetchFlightsByCityId = async (cityId) => {
    const options = {
      method: "GET",
      url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/SE-sky/${cityId}/anytime`,
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setFlightData(response.data);
        setQuotes(response.data.Quotes);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAirportsByCity(city);
  }, []);

  return (
    <div className={styles.widgetContainer}>
      <h2>
        Billigaste flygbiljetterna från alla flygplatser i Sverige till alla
        flygplatser i {city}!
      </h2>
      <table>
        <thead>
        <tr>
          <th>Från</th>
          <th>Till</th>
          <th>Pris</th>
          <th>Avgångsdatum</th>
        </tr>
        </thead>
        <tbody>
        {quotes.map((dest) => (
          <tr className={styles.flights} key={dest.QuoteId}>
            <td>{dest.OutboundLeg.OriginId}</td>
            <td>{dest.OutboundLeg.DestinationId}</td>
            <td>{dest.MinPrice} :-</td>
            <td>{dest.OutboundLeg.DepartureDate}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <iframe
        src="https://widgets.skyscanner.net/widget-server/widgets/iframe?skyscannerWidget=FlightSearchWidget&associateId=ABBBCCC&locale=sv-SE&market=SE&currency=SEK&directFlights=true"
        title="widget"
      ></iframe>{" "}
    </div>
  );
};

export default Skyscannerapi;
