import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Weather = (query) => {
  const lat = "-16.919124";
  const lon = "145.778032";
  const apiKey = "b3445262319771d29d98e56a041cf9dc";
  const [results, setResults] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentTemp, setCurrentTemp] = useState();
  const [currentIcon, setCurrentIcon] = useState();
  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      console.log(result.data);
      setResults(result.data);
      setOffset(result.data.timezone_offset + new Date().getTimezoneOffset() * 60);
      setCurrentTemp(Math.round(result.data.current.temp));
      setCurrentIcon(result.data.current.weather[0].icon);
      setDailyData(result.data.daily.slice(1));
    };
    getData();
  }, []);

  const log = () => {
    processDailyData();
  };
  useEffect(() => {
    const updateTime = () => {
      const newTime = new Date(new Date().getTime() + offset * 1000);
      setCurrentTime(newTime.toLocaleTimeString("en-GB"));
      return setTimeout(() => {
        updateTime();
      }, 1000);
    };

    if (offset !== 0) {
      setSunset([
        new Date(results.current.sunset * 1000 + offset * 1000).getHours(),
        new Date(results.current.sunset * 1000 + offset * 1000).getMinutes(),
      ]);
      setSunrise([
        new Date(results.current.sunrise * 1000 + offset * 1000).getHours(),
        new Date(results.current.sunrise * 1000 + offset * 1000).getMinutes(),
      ]);

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
        <p>
          {weekday} {temp} C <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
        </p>
      </div>
    );
  };

  return (
    <div className={styles.main}>
      Weather
      <button onClick={log}>Log</button>
      <p>
        Local time in {query.query}: {currentTime}
      </p>
      <p>
        Sunrise: {sunrise[0]}:{sunrise[1]}
      </p>
      <p>
        Sunset: {sunset[0]}:{sunset[1]}
      </p>
      <p>
        Current temperature: {currentTemp} C{" "}
        <img src={`http://openweathermap.org/img/wn/${currentIcon}.png`} alt="weather icon" />
      </p>
      <div>
        <span>Forecast:</span>
        {!!dailyData && dailyData.map((day) => processDailyData(day))}
      </div>
    </div>
  );
};

export default Weather;
