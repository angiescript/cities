import React from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";
import Flightspage from "./Pages/Flightspage";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/:query" component={Citypage} />
      <Route path="/:query/flights" component={Flightspage} />

    </div>
  );
};

export default Main;
