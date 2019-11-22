import React, { Component } from "react";
import PropTypes from "prop-types";
import Rand from "../utils/Rand.js";
import Ball from "./particles/Ball.jsx";
import Color from "./particles/Color.jsx";
import Lines from "./particles/Lines.jsx";
import Thick from "./particles/Thick.jsx";
import Square from "./particles/Square.jsx";
import Cobweb from "./particles/Cobweb.jsx";
import Circle from "./particles/Circle.jsx";
import Tadpole from "./particles/Tadpole.jsx";
import Polygon from "./particles/Polygon.jsx";
import Fountain from "./particles/Fountain.jsx";

import styles from "./styles.css";

export default class ParticlesBg extends Component {
  static propTypes = {
    type: PropTypes.type
  };

  constructor(props) {
    super(props);
  }

  getRandom(num) {
    if (!this.rand) {
      this.rand = new Rand();
      this.rand.set(0.25, <Color num={num} />);
      this.rand.set(0.2, <Ball num={num} />);
      this.rand.set(0.2, <Lines num={num} />);
      this.rand.set(0.16, <Thick num={num} />);
      this.rand.set(0.18, <Circle num={num} />);
      this.rand.set(0.04, <Cobweb num={num} />);
      this.rand.set(0.1, <Polygon num={num} />);
      this.rand.set(0.08, <Square num={num} />);
      this.rand.set(0.18, <Tadpole num={num} />);
      this.rand.set(0.15, <Fountain num={num} />);
    }

    return this.rand.getResult();
  }

  getBgParticles() {
    const { type, num } = this.props;

    let particles;
    switch (type) {
      case "color":
        particles = <Color num={num} />;
        break;
      case "ball":
        particles = <Ball num={num} />;
        break;
      case "lines":
        particles = <Lines num={num} />;
        break;
      case "thick":
        particles = <Thick num={num} />;
        break;
      case "circle":
        particles = <Circle num={num} />;
        break;
      case "cobweb":
        particles = <Cobweb num={num} />;
        break;
      case "polygon":
        particles = <Polygon num={num} />;
        break;
      case "square":
        particles = <Square num={num} />;
        break;
      case "tadpole":
        particles = <Tadpole num={num} />;
        break;
      case "fountain":
        particles = <Fountain num={num} />;
        break;
      case "random":
        particles = this.getRandom(num);
        break;

      default:
        particles = <Color num={num} />;
        break;
    }

    return particles;
  }

  render() {
    const particles = this.getBgParticles();
    return <React.Fragment>{particles}</React.Fragment>;
  }
}
