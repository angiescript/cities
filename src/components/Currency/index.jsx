import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";

const Currency = () => {
  const country = useParams().query;
  const apiKey = "9b0a137f140b003ece5560ee";
  const baseCurrency = "SEK";
  const [conRate, setConRate] = useState(0);
  const [amount, setAmount] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("SEK");
  const [currentRate, setCurrentRate] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  useEffect(() => {
  const fetchCurrency = async () => {
    const result = await axios(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    setConRate(result.data.conversion_rates);
    setCurrencyList(Object.keys(result.data.conversion_rates));
    console.log(conRate);
    console.log(result.data);
    console.log(country);
  };
     fetchCurrency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  useEffect(() => {
    console.log("checking for rates")
    for (const currency in conRate) {
      
      if (currency === selectedCurrency) {
        setCurrentRate(conRate[currency]);
   
      }
    }}, [selectedCurrency, conRate]);
      
  const calculate = (e) => {
    e.preventDefault();
    let calc = amount * currentRate;
    setCalculatedAmount(calc);
  };

  return (
    <div className={styles.exchangeDiv}>
      change from{" "}
      <form onSubmit={calculate}>
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      
      {baseCurrency} to
      <select onChange={(e) => setSelectedCurrency(e.target.value)}>
        {currencyList.map((list) => (
          <option key={list.value} value={list.value}>
            {list}
          </option>
        ))}
      </select>
      
        <button>Calculate</button>
      </form>
      <p>{calculatedAmount}</p>
    </div>
  );
};

export default Currency;
