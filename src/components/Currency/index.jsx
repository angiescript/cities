import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const Currency = ({ cityInfo, open }) => {
  const country = cityInfo.country;
  const apiKey = "9b0a137f140b003ece5560ee";
  const baseCurrency = "SEK";
  const [conRate, setConRate] = useState(0);
  const [amount, setAmount] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currentRate, setCurrentRate] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  useEffect(() => {
    if (Object.keys(cityInfo).length) {
      const fetchCurrency = async () => {
        const result = await axios(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
        setConRate(result.data.conversion_rates);

        const countryResult = await axios(`https://restcountries.com/v2/name/${country}`);

        if (countryResult.data.status === 404) {
          return null;
        }
        setSelectedCurrency(countryResult.data[0].currencies[0].code);

        setCurrencyList([countryResult.data[0].currencies[0].code, ...Object.keys(result.data.conversion_rates)]);
      };
      fetchCurrency();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityInfo]);
  useEffect(() => {
    for (const currency in conRate) {
      if (currency === selectedCurrency) {
        setCurrentRate(conRate[currency]);
      }
    }
  }, [selectedCurrency, conRate, cityInfo]);

  const calculate = (e) => {
    e.preventDefault();
    setAmount(Number(e.target.value));
    let calc = e.target.value * currentRate;
    calc = calc.toFixed(2);
    setCalculatedAmount(calc);
  };

  const newValue = (e) => {
    setSelectedCurrency(e.target.value);
    setAmount(0);
    setCalculatedAmount(0);
  };

  if (!open) return <> </>;

  return (
    <div className={styles.exchangeDiv}>
      <h2>Change from </h2>
      <form className={styles.exchangeForm}>
        <input type="text" placeholder="amount" value={amount} onChange={(e) => calculate(e)} /> {baseCurrency}
        <div>
          to
          <select onChange={(e) => newValue(e)}>
            {currencyList.map((list, i) => (
              <option key={i} value={list.value}>
                {list}
              </option>
            ))}
          </select>
        </div>
      </form>
      <p>
        1 {baseCurrency} = {currentRate.toFixed(3)} {selectedCurrency}
      </p>
      <div className={styles.exchangeSum}>
        {calculatedAmount} {selectedCurrency}
      </div>
    </div>
  );
};

export default Currency;
