import axios from "axios";
import { useState } from "react";
import "./app.module.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Main from "./Main";

function App() {

  const [cities, setCities] = useState([]);

  const fetchData = async (query) => {
    var options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: {
        minPopulation: "500",
        namePrefix: `${query}`,
        sort: "-population ",
        languageCode: "en",
      },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "cbdb60d271msh4d770f4189d5422p10c515jsn248e3c4f8c77",
      },
    };

    const request = await axios
      .request(options)
      .then((response) => {
        setCities(response.data.data);
        console.log(response.data.data);
        return request;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  fetchData("paris");

  return (
    <div className="App">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
