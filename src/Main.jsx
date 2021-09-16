import React, { useState } from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";

const Main = () => {
  const [cityInfo, setCityInfo] = useState({});
  return (
    <div>
      <Route exact path="/">
        <Homepage setCityInfo={setCityInfo} />
      </Route>
      <Route path="/:query">
        <Citypage cityInfo={cityInfo} />
      </Route>
    </div>
  );
};

export default Main;
