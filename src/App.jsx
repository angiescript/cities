import "./app.module.scss";
import Navbar from "./components/Navbar";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
import { useState } from "react";
// import Footer from "./components/Footer";

function App() {
  const [cityInfo, setCityInfo] = useState({});

  return (
    <div className="App">
      <Router>
        <Navbar cityInfo={cityInfo} setCityInfo={setCityInfo} />
        <Main cityInfo={cityInfo} setCityInfo={setCityInfo} />
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
