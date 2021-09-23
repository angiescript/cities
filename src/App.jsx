import "./app.module.scss";
import Navbar from "./components/Navbar";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main />
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
