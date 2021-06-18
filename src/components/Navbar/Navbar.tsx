import "./Navbar.css";
import IconButton from "../IconButton/IconButton";
const Navbar = () => {
  return (
    <nav className="navbar-styles">
      <div className="columns is-vcentered is-mobile">
        <div className="navbar-logo column has-text-left is-3-fullhd is-3-desktop is-5-tablet is-5-mobile ">
          <p className="subtitle is-lightest">js-playground</p>
        </div>

        <div className="column is-6-fullhd is-6-desktop is 1-tablet is-1-mobile" />

        <div className="column is-3-fullhd is-3-desktop is 6-tablet is-6-mobile">
          <div className="nav-buttons-div buttons is-right">
            <IconButton
              styleClasses="is-medium nav-buttons"
              iconName="fas fa-home"
              onClick={() => (window.location.href = "/")}
            />
            <IconButton
              styleClasses="is-medium nav-buttons"
              iconName="fas fa-question-circle"
              onClick={() => window.open("https://www.google.com")}
            />
            <IconButton
              styleClasses="is-medium nav-buttons"
              iconName="fab fa-github"
              onClick={() =>
                window.open("https://github.com/siddvader333/js-playground")
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
