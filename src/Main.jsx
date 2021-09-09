import React from "react";
import { Route } from "react-router-dom";
import Placeholder from "./components/placeholder";
import Homepage from "./Pages/Homepage";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Homepage} />
      <Route path="/:query" component={Placeholder} />
    </div>
  );
};

export default Main;
