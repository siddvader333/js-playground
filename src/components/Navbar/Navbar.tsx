import "./Navbar.css";
import IconButton from "../IconButton/IconButton";
const Navbar = () => {
  return (
    <nav className="navbar navbar-styles">
      <div className="navbar-brand">
        <div className="navbar-item nav-logo">
          <p className="subtitle is-5 is-lightest">js-playground</p>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end nav-buttons-div">
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
    </nav>
  );
};

export default Navbar;
