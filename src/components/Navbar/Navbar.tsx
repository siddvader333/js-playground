import './Navbar.css';
import IconButton from '../IconButton/IconButton';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className="navbar-styles">
			<div className="columns is-vcentered is-mobile">
				<div className="navbar-logo column has-text-left is-3-fullhd is-3-desktop is-5-tablet is-5-mobile ">
					<Link to="/">
						<p className="subtitle is-lightest">js-playground</p>
					</Link>
				</div>

				<div className="column is-6-fullhd is-6-desktop is 1-tablet is-1-mobile" />

				<div className="column is-3-fullhd is-3-desktop is 6-tablet is-6-mobile">
					<div className="nav-buttons-div buttons is-right">
						<Link to="/">
							<IconButton
								styleClasses="is-normal nav-buttons is-light"
								iconName="fas fa-home"
								onClick={() => (window.location.href = '/')}
							/>
						</Link>
						<IconButton
							styleClasses="is-normal nav-buttons is-light"
							iconName="fas fa-question-circle"
							onClick={() => window.open('https://www.google.com')}
						/>
						<IconButton
							styleClasses="is-normal nav-buttons is-light"
							iconName="fab fa-github"
							onClick={() => window.open('https://github.com/siddvader333/js-playground')}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
