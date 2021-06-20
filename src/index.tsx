//import "bulmaswatch/darkly/bulmaswatch.min.css";
import './sass/app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/CellList/CellList';
import { store } from './redux';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/HomePage/Home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/:playgroundId" component={CellList} />
					<Route component={Home} />
				</Switch>
			</Router>
		</Provider>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
