import Particles from "react-particles-js";
import particlesParams from "../../assets/particles";
import "./Home.css";
import JSXCodeExample from "../../assets/images/jsxCodeExample.png";
import vanillaJSCodeExample from "../../assets/images/vanillaJSCodeExample.png";
import cssCodeExample from "../../assets/images/cssCodeExample.png";
import IconButton from "../../components/IconButton/IconButton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ImageList = [vanillaJSCodeExample, JSXCodeExample, cssCodeExample];
const ImageTitleList = ["Vanilla JS Support", "JSX Support", "CSS Support"];
const Home: React.FC = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (carouselIndex > 2) {
      //rotate carousel around
      setCarouselIndex(0);
      return;
    } else if (carouselIndex < 0) {
      setCarouselIndex(2);
      return;
    }
  }, [carouselIndex]);
  return (
    <>
      <Particles className="particles" params={particlesParams} />
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12-mobile is-12-tablet is-12-desktop is-12-fullhd">
          <div className="home-container columns is-vcentered is-mobile">
            <div className="column is-2-mobile is-2-tablet is-2-desktop is-2-fullhd"></div>
            <div className="home-card card column is-8-mobile is-8-tablet is-7-desktop is-8-fullhd">
              <div className="card-content">
                <p className="subtitle has-text-weight-light is-5">
                  Welcome to
                </p>
                <p className="title is-4-mobile has-text-weight-normal is-spaced">
                  JS-Playground.
                </p>
                <p className="subtitle  has-text-weight-light is-6 ">
                  Create a new playground and create modular, documented code
                  you can share with others.
                </p>
                <br />
                <div className="field buttons">
                  <Link to="/playgroundId=123">
                    <button className="button is-rounded is-normal is-white is-light ">
                      Create New Playground
                    </button>
                  </Link>

                </div>
              </div>
            </div>
            <div className="column is-2-mobile is-2-tablet is-3-desktop is-2-fullhd"></div>
          </div>
        </div>

        <div className="column is-12-mobile is-12-tablet is-12-desktop is-12-fullhd">
          <div className="columns is-vcentered is-mobile">
            <div className="column has-text-right is-1-mobile is-1-tablet is-3-desktop is-3-fullhd">
              <IconButton
                styleClasses="is-primary is-light is-small"
                iconName="fas fa-chevron-left"
                onClick={() =>
                  setCarouselIndex(
                    carouselIndex - 1 < 0 ? 2 : carouselIndex - 1
                  )
                }
              />
            </div>

            <div className="home-card card column has-text-centered is-10-mobile is-10-tablet is-6-desktop is-6-fullhd">
              <div className="card-content">
                <p className="title is-4  has-text-weight-light is-spaced">
                  {ImageTitleList[carouselIndex]}
                </p>
                <img className="code-example " src={ImageList[carouselIndex]} />
              </div>
            </div>

            <div className="column has-text-left is-1-mobile is-1-tablet is-3-desktop is-3-fullhd">
              <IconButton
                styleClasses="is-primary is-light is-small"
                iconName="fas fa-chevron-right"
                onClick={() =>
                  setCarouselIndex(
                    carouselIndex + 1 > 2 ? 0 : carouselIndex + 1
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
