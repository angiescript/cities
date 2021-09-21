import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import styles from "./index.module.scss";

const Sightspage = ({ cityInfo }) => {
  const lon = cityInfo.longitude;
  const lat = cityInfo.latitude;

  const [allSights, setallSights] = useState([]);
  const [fullSightsInfo, setfullSightsInfo] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const cityName = capitalizeFirstLetter(useParams().query);

  const fetchSights = async () => {
    const result = await axios("https://api.opentripmap.com/0.1/en/places/radius?radius=5000", {
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
    });
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allSights.length > 0) {
      allSights.map((value) => {
        fetchSightsID(value.xid);

        return null;
      });
    }
  }, [allSights]);

  return (
    <div className={styles.main}>
      <div className={styles.paper}>
        <div className={styles.banner}>
          <BackButton url={`/${cityName}`} />
          <h2>Interesting places to visit in {cityName}:</h2>
          <div className={styles.sightsBox}>
            {fullSightsInfo.map((sight, index) => {
              return (
                <div className={styles.sight} key={index}>
                  <img src={sight.preview.source} alt={sight.wikipedia_extracts.title} />
                  <h3>{sight.name}</h3>
                  <>{sight.wikipedia_extracts.text}</>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sightspage;
