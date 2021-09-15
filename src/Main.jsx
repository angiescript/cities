import React from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";
import Sightspage from "./Pages/Sightspage";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/:query" component={Citypage} />
      <Route path="/:query/sights" component={Sightspage} />
    </div>
  );
};

export default Main;
