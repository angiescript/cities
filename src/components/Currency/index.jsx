import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";

const Currency = (cityInfo) => {
  const country = cityInfo.cityInfo.cityInfo.country;
  const apiKey = "9b0a137f140b003ece5560ee";
  const baseCurrency = "SEK";
  const [countryCurrency, setCountryCurrency] = useState("");
  const [conRate, setConRate] = useState(0);
  const [amount, setAmount] = useState("");
  const [currencyList, setCurrencyList] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currentRate, setCurrentRate] = useState(0);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  useEffect(() => {
  const fetchCurrency = async () => {

    const result = await axios(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`
    );
    setConRate(result.data.conversion_rates);
    console.log(conRate);
    console.log(result.data);
    
    
    // const fetchCurrencyName = async () => {
      const countryResult = await axios(
        `https://restcountries.eu/rest/v2/name/${country}`
        );
        
        setCountryCurrency(countryResult.data[0].currencies[0].code);
        setSelectedCurrency(countryResult.data[0].currencies[0].code);
        console.log(countryResult.data[0].currencies[0].code);
        
        setCurrencyList([countryResult.data[0].currencies[0].code, ...Object.keys(result.data.conversion_rates)]);
        
      };
  
    //  fetchCurrencyName();
     fetchCurrency();

    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);


  useEffect(() => {
    console.log("checking for rates")
    console.log(currencyList);
    for (const currency in conRate) {
      
      if (currency === selectedCurrency) {
        setCurrentRate(conRate[currency]);
   
      }
    }}, [selectedCurrency, conRate]);
      
  const calculate = (e) => {

    e.preventDefault();
    console.log(e.target.value);
    setAmount(Number(e.target.value))
    let calc = e.target.value * currentRate;
    setCalculatedAmount(calc);
    
  };

  const newValue = (e) => {
    setSelectedCurrency(e.target.value)
    setAmount(0);
    setCalculatedAmount(0);
  }
  
  console.log(selectedCurrency);

  return (
    <div className={styles.exchangeDiv}>
      change from{" "}
      <form>
        <input
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(e) => calculate(e)}
        />
      
      {baseCurrency} to
      <select onChange={(e) => newValue(e) }>
        {currencyList.map((list) => (
          <option key={list.value} value={list.value}>
            {list}
          </option>
        ))}
      </select>
      </form>
      <p>{calculatedAmount}</p>
    </div>
  );
};

export default Currency;
