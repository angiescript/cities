import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import FlightsBoard from "../../components/FlightsBoard";
import SearchFlightsBoard from "../../components/SearchFlightsBoard";
import BackButton from "../../components/BackButton";

const Skyscannerapi = ({ cityInfo }) => {
  const city = cityInfo.city;

  const [quotes, setQuotes] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [sweAirports, setSweAirports] = useState([]);
  const [notSweAirports, setNotSweAirports] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [searchResult, setSearchResult] = useState([]);

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

  const fetchSpecificFlights = async (from, to, departureDate) => {
    let newDate = "anytime";

    if (departureDate !== "") {
      newDate = departureDate;
    }

    const config = {
      headers: {
        "x-rapidapi-host":
          "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    await axios
      .get(
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/SE/SEK/SE/${from}/${to}/${newDate}`,
        config
      )
      .then((response) => {
        setSearchResult(response.data.Quotes);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAirportsByCity(city);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchSpecificFlights(from, to, departureDate);
  };

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  today = `${yyyy}-${mm}-${dd}`;

  const resetDate = () => {
    setDepartureDate("");
  };


  return (
    <div className={styles.widgetContainer}>
      
      <div className={styles.poster}>
      <BackButton url={`/${city}`} className={styles.backButton}/>
        <div>
          <h2>Find the cheapest airline tickets!</h2>
          <h3>At all airports in Sweden to all airports in {city}</h3>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <input type="radio" name="One-way" className={styles.radioBtn} checked/>
              <label htmlFor="One-wat" className={styles.radioLabel}>One way</label>
              <div className={styles.destinations}>
                <div className={styles.from}>
                  <label>From</label>
                  <select
                    name="value1"
                    id="value2"
                    onChange={(value1) => setFrom(value1.target.value)}
                  >
                    <option></option>
                    <option value="SE-sky">Sverige</option>
                    {sweAirports.map((airport, index) => {
                      return (
                        <option key={index} value={airport.SkyscannerCode}>
                          {airport.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={styles.to}>
                  <label>To</label>
                  <select
                    name="value2"
                    id="value2"
                    onChange={(value2) => setTo(value2.target.value)}
                  >
                    <option></option>
                    {notSweAirports.map((airport, index) => {
                      return (
                        <option key={index} value={airport.SkyscannerCode}>
                          {airport.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className={styles.dates}>
                <div className={styles.departureDate}>
                  <div className={styles.labelContainer}>
                  <label htmlFor="date">Departure</label>
                <p className={styles.reset} onClick={() => resetDate()}>
                  Reset date
                </p>
                </div>
                  <input
                    className={styles.date1}
                    type="date"
                    name="date1"
                    id="date"
                    min={today}
                    value={departureDate}
                    onChange={(departureDate) =>
                      setDepartureDate(departureDate.target.value)
                    }
                  />
                </div>

                <div className={styles.arrivalDate}>
                  <label htmlFor="date2">Return</label>
                  <input
                    disabled
                    className={styles.date2}
                    type="date"
                    name="date2"
                    id="date"
                    min={today}
                    value={returnDate}
                    onChange={(returnDate) =>
                      setReturnDate(returnDate.target.value)
                    }
                  />
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button className={styles.submit}>Search</button> 
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <SearchFlightsBoard searchResult={searchResult} flightData={flightData} />
      <FlightsBoard quotes={quotes} flightData={flightData} />
    </div>
  );
};

export default Skyscannerapi;
