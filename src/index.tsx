//import "bulmaswatch/darkly/bulmaswatch.min.css";
import "./sass/app.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CellList from "./components/CellList/CellList";
import { store } from "./redux";
import Navbar from "./components/Navbar/Navbar";
import Particles from "react-particles-js";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <div>
        <CellList />
      </div>
      <Particles
        className="particles"
        params={{
          particles: {
            number: {
              value: 50,
            },
            line_linked: {
              shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5,
              },
            },
            size: {
              value: 3,
            },
            color: { value: "#000000" },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
