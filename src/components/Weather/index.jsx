import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Weather = ({ query, lon, lat, open }) => {
  const apiKey = "b3445262319771d29d98e56a041cf9dc";
  const [results, setResults] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [offset, setOffset] = useState(1);
  const [currentTemp, setCurrentTemp] = useState();
  const [currentIcon, setCurrentIcon] = useState();
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setResults(result.data);
      setOffset(result.data.timezone_offset + new Date().getTimezoneOffset() * 60);
      setCurrentTemp(Math.round(result.data.current.temp));
      setCurrentIcon(result.data.current.weather[0].icon);
      setDailyData(result.data.daily.slice(1));
    };
    getData();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const newTime = new Date(new Date().getTime() + offset * 1000);
      setCurrentTime(newTime.toLocaleTimeString("en-GB"));
      return setTimeout(() => {
        updateTime();
      }, 1000);
    };

    if (offset !== 1) {
      setSunset(
        new Date(results.current.sunset * 1000 + offset * 1000).toLocaleTimeString(["en-GB"], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setSunrise(
        new Date(results.current.sunrise * 1000 + offset * 1000).toLocaleTimeString(["en-GB"], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      updateTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const processDailyData = (day) => {
    const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(day.dt * 1000 + offset * 1000)
    );
    const icon = day.weather[0].icon;
    const temp = Math.round(day.temp.day);
    return (
      <div key={day.dt}>
        <span>
          {weekday} {temp} C{" "}
          <img src={`http://openweathermap.org/img/wn/${icon !== undefined ? icon : "01d"}.png`} alt="weather icon" />
        </span>
      </div>
    );
  };

  if (!open) return <> </>;

  if (lat === undefined || lon === undefined)
    return (
      <div className={styles.main}>
        <div className={styles.paper}>
          <h3 className={styles.undefined}>No weatherdata available</h3>
          <p>Please go back and search again...</p>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <h3>Weather in {query}</h3>
        <p>
          Local time in {query}: {currentTime}
        </p>
        <p>Sunrise: {sunrise}</p>
        <p>Sunset: {sunset}</p>
        <span>
          Temperature: {currentTemp} C{" "}
          <img src={`http://openweathermap.org/img/wn/${currentIcon}.png`} alt="weather icon" />
        </span>
        <div className={styles.forecast}>
          <h4>Forecast:</h4>
          {!!dailyData && dailyData.map((day) => processDailyData(day))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
