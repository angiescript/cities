import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./index.module.scss";

const Sightspage = () => {
  const [lon, setLon] = useState(18.06871);
  const [lat, setlat] = useState(59.32938);
  const [allSights, setallSights] = useState([]);
  const [fullSightsInfo, setfullSightsInfo] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const history = useHistory();
  const cityName = capitalizeFirstLetter(useParams().query);

  const fetchSights = async () => {
    const result = await axios(
      "https://api.opentripmap.com/0.1/en/places/radius?radius=5000",
      {
        params: {
          lon: lon,
          lat: lat,
          src_geom: "wikidata",
          src_attr: "wikidata",
          rate: "3",
          format: "json",
          limit: 3,
          apikey: "5ae2e3f221c38a28845f05b630581e70e6cfc50c2a260ad2cdbca93e",
        },
      }
    );
    return setallSights(result.data);
  };

  const fetchSightsID = async (xid) => {
    const result = await axios(
      `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b630581e70e6cfc50c2a260ad2cdbca93e`
    );

    return setfullSightsInfo((oldArr) => [...oldArr, result.data]);
  };

  useEffect(() => {
    fetchSights();
  }, []);

  useEffect(() => {
    console.log(allSights);

    if (allSights.length > 0) {
      allSights.map((value) => {
        fetchSightsID(value.xid);


        return;
      });
    }
  }, [allSights]);

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <h2>Interesting places to visit in {cityName}:</h2>
          <div className={styles.sightsBox}>
            {fullSightsInfo.map((sight, index) => {
              return (
                <div className={styles.sight}>
                  <img
                    src={sight.preview.source}
                    alt={sight.wikipedia_extracts.title}
                  />
                  <h3>{sight.name}</h3>
                  <>{sight.wikipedia_extracts.text}</>
                </div>
              );
            })}
          </div>
          <button onClick={() => history.push(`/${cityName}`)}>
            Back to Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sightspage;
