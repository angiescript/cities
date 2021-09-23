import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import BackButton from "../../components/BackButton";



const Skyscannerapi = ({ cityInfo }) => {
  const city = cityInfo.city;

  const [quotes, setQuotes] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [sweAirports, setSweAirports] = useState([]);
  const [notSweAirports, setNotSweAirports] = useState([]);
  const [date, setDate] = useState(null);

  const fetchAirportsByCity = async (city) => {
    const config = {
      params: { query: `${city}` },
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    await axios
      .get(
        "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/SE/SEK/SE/",
        config
      )
      .then((response) => {
        fetchFlightsByCityId(response.data.Places[0].CityId);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchFlightsByCityId = async (cityId) => {
    const config = {
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    await axios
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/SE-sky/${cityId}/anytime`,
        config
      )
      .then((response) => {
        setFlightData(response.data);
        setQuotes(response.data.Quotes);
        let swe = response.data.Places.filter(
          (airport) => airport.CountryName === "Sweden"
        );
        let notSwe = response.data.Places.filter(
          (airport) => airport.CountryName !== `Sweden`
        );
        setSweAirports(swe.sort((a, b) => (a.Name > b.Name && 1) || -1));
        setNotSweAirports(notSwe.sort((a, b) => (a.Name > b.Name && 1) || -1));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchSpecificFlights = async (from, to, date) => {
    const config = {
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    await axios
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/${from}/${to}/${date}`,
        config
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAirportsByCity(city);
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Från: ${from}`);
    console.log(`Till: ${to}`);
    console.log(`Datum: ${date}`);
    fetchSpecificFlights(from, to);

  };

  return (
    <div className={styles.widgetContainer}>
      <h2>Hitta de billigaste flygbiljetterna!</h2>
      <h3>På alla flygplatser i Sverige till alla flygplatser i {city}</h3>
      <form onSubmit={handleSubmit}>
        <select
          name="value1"
          id="value2"
          onChange={(value1) => setFrom(value1.target.value)}
        >
          <option>Från:</option>
          <option value="SE-sky">Sverige</option>
          {sweAirports.map((airport) => {
            return (
              <option key={airport.Name} value={airport.SkyscannerCode}>
                {airport.Name}
              </option>
            );
          })}
        </select>
        <select
          name="value2"
          id="value2"
          onChange={(value2) => setTo(value2.target.value)}
        >
          <option>Till:</option>
          {notSweAirports.map((airport) => {
            return (
              <option key={airport.Name} value={airport.SkyscannerCode}>
                {airport.Name}
              </option>
            );
          })}
        </select>

        <div></div>
        <input type="date" name="date" id="date" value={date} onChange={(date) => setDate(date.target.value)} />
        <button>Sök</button>
      </form>
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
                let direct = "";

                if (dest.Direct === true ? (direct = "Ja") : (direct = "Nej"))
                  return (
                    <tr className={styles.flights} key={dest.QuoteId}>
                      <td className={styles.from}>{departureFromAirport}</td>
                      <td className={styles.to}>{arriveToAirport}</td>
                      <td className={styles.price}>Från {dest.MinPrice} :-</td>
                      <td>{direct}</td>
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