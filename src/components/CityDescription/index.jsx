import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const CityDescription = ({ cityInfo }) => {
  const cityName = cityInfo.city;
  const [CityDescription, setCityDescription] = useState([]);
  const [text, setText] = useState("");

  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      origin: "*",
      action: "query",
      titles: cityName,
      format: "json",
      prop: "extracts|pageimages",
      exsentences: "10",
      exlimit: "1",
      explaintext: "1",
      formatversion: "2",
    });

  const request = axios
    .request(url)
    .then((response) => {
      console.log(response.data.query.pages[0].extract.replace(/\. /, ". \n"));
      setCityDescription(response.data.query.pages[0].extract.replace(/\. /, ". \n"));
      // setCityDescription(response.data.query.pages[0].extract);
      return request;
    })
    .catch(function (error) {
      console.error(error);
    });

  /*  const breakString = (str, limit) => {
      let brokenString = '';
      for(let i = 0, count = 0; i < str.length; i++){
         if(count >= limit && str[i] === '.'){
            count = 0;
            brokenString += '.\n';
         }else{
            count++;
            brokenString += str[i];
         }
        }
         return brokenString;
      }*/

  /*  useEffect(() => {
      const breakString = (str, limit) => {
        let brokenString = '';
        for(let i = 0, count = 0; i < str.length; i++){
           if(count >= limit && str[i] === '.'){
              count = 0;
              brokenString += '.\n';
           }else{
              count++;
              brokenString += str[i];
           }
        }
        console.log(brokenString);
        setText(brokenString);
        
        console.log(text);
      }
      breakString(CityDescription, 10)
    }, [CityDescription, text])*/

    /*setText(breakString(CityDescription, 20));*/
    
  return (
    <div className={styles.mainDesc}>
      {CityDescription}
    </div>
  );
};

export default CityDescription;
