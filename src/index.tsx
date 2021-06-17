//import "bulmaswatch/darkly/bulmaswatch.min.css";
import "./sass/app.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CellList from "./components/CellList/CellList";
import { store } from "./redux";
import AddCodeModal from "./components/AddCodeModal/AddCodeModal";
import React, { useState } from "react";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
