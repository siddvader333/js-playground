import "bulmaswatch/darkly/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
