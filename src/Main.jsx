import React, { useState } from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";
import Sightspage from "./Pages/Sightspage";

const Main = () => {
  const [cityInfo, setCityInfo] = useState({});
  return (
    <div>
      <Route exact path="/">
        <Homepage setCityInfo={setCityInfo} />
      </Route>
      <Route exact path="/:query">
        <Citypage cityInfo={cityInfo} />
      </Route>
      <Route path="/:query/sights">
        <Sightspage />
      </Route>
    </div>
  );
};

export default Main;
