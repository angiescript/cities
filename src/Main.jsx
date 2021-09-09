import React from "react";
import { Route } from "react-router-dom";
import Citypage from "./Pages/Citypage";
import Homepage from "./Pages/Homepage";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
      <Route path="/:query" component={Citypage} />
    </div>
  );
};

export default Main;
