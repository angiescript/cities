import React from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";
import Sightspage from "./Pages/Sightspage";
import Flightspage from "./Pages/Flightspage";

const Main = ({ cityInfo, setCityInfo }) => {
  return (
    <div>
      <Route exact path="/">
        <Homepage setCityInfo={setCityInfo} cityInfo={cityInfo} />
      </Route>
      <Route exact path="/:query">
        <Citypage cityInfo={cityInfo} />
      </Route>
      <Route path="/:query/sights">
        <Sightspage cityInfo={cityInfo} />
      </Route>
      <Route path="/:query/flights">
        <Flightspage cityInfo={cityInfo} />
      </Route>
    </div>
  );
};

export default Main;
