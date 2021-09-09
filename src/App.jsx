import "./app.module.scss";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Main from "./Main";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Main />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
