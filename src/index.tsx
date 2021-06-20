//import "bulmaswatch/darkly/bulmaswatch.min.css";
import "./sass/app.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CellList from "./components/CellList/CellList";
import { store } from "./redux";
import Navbar from "./components/Navbar/Navbar";
import Particles from "react-particles-js";
import Home from "./pages/HomePage/Home";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Home />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
