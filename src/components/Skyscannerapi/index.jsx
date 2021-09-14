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
    const config = {
      params: { query: `${city}` },
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/SE/",
        config
      )
      .then((response) => {
        console.table(response.data.Places); // Airports in with searchterm "city"
        console.log(response.data.Places[0].CityId); // first object contains "CityId"
        fetchFlightsByCityId(response.data.Places[0].CityId);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Fetch request with 'cityId', to search flights including all airports in london
  const fetchFlightsByCityId = async (cityId) => {
    const config = {
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/SE-sky/${cityId}/anytime`,
        config
      )
      .then((response) => {
        // console.log(response.data);
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
      <h2>Hitta de billigaste flygbiljetterna!</h2>
      <h3>Från alla flygplatser i Sverige till alla flygplatser i {city}</h3>
      <div className={styles.contentWrapper}>
      <div className={styles.tableDiv}>
      <table>
        <thead>
          <tr>
            <th>Från</th>
            <th>Till</th>
            <th>Pris</th>
            <th>Direktflyg</th>
            <th>Avgångsdatum</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((dest) => {
            let departureFromAirport = flightData.Places.find(
              (place) => dest.OutboundLeg.OriginId === place.PlaceId
            ).Name;
            let arriveToAirport = flightData.Places.find(
              (place) => dest.OutboundLeg.DestinationId === place.PlaceId
            ).Name;
            let departureDate = dest.OutboundLeg.DepartureDate.slice(0, 10);
            return (
              <tr className={styles.flights} key={dest.QuoteId}>
                <td>{departureFromAirport}</td>
                <td>{arriveToAirport}</td>
                <td>{dest.MinPrice} :-</td>
                <td>Nej</td>
                <td>{departureDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <iframe
        src="https://widgets.skyscanner.net/widget-server/widgets/iframe?skyscannerWidget=FlightSearchWidget&associateId=ABBBCCC&locale=sv-SE&market=SE&currency=SEK&directFlights=true"
        title="widget"
      ></iframe>
    </div>
    </div>
  );
};

export default Skyscannerapi;
