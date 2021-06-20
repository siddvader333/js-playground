const particlesParams = {
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
};

export default particlesParams;
