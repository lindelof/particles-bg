import React, { Component } from "react";
import Rand from "./utils/Rand.js";
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

export default class ParticlesBg extends Component {

  constructor(props) {
    super(props);
  }

  getRandom() {
    const { num, bg,color } = this.props;

    if (!this.rand) {
      this.rand = new Rand();
      this.rand.set(0.25, <Color num={num} bg={bg} color={color} />);
      this.rand.set(0.2, <Ball num={num} bg={bg} color={color} />);
      this.rand.set(0.2, <Lines num={num} bg={bg} color={color} />);
      this.rand.set(0.16, <Thick num={num} bg={bg} color={color} />);
      this.rand.set(0.18, <Circle num={num} bg={bg} color={color} />);
      this.rand.set(0.04, <Cobweb num={num} bg={bg} color={color} />);
      this.rand.set(0.1, <Polygon num={num} bg={bg} color={color} />);
      this.rand.set(0.08, <Square num={num} bg={bg} color={color} />);
      this.rand.set(0.18, <Tadpole num={num} bg={bg} color={color} />);
      this.rand.set(0.15, <Fountain num={num} bg={bg} color={color} />);
    }
    return this.rand.getResult();
  }

  getBgParticles() {
    const { type, num, bg, color } = this.props;

    let particles;
    switch (String(type).toLowerCase()) {
      case "color":
        particles = <Color num={num} bg={bg} color={color} />;
        break;
      case "ball":
        particles = <Ball num={num} bg={bg} color={color} />;
        break;
      case "lines":
        particles = <Lines num={num} bg={bg} color={color} />;
        break;
      case "thick":
        particles = <Thick num={num} bg={bg} color={color} />;
        break;
      case "circle":
        particles = <Circle num={num} bg={bg} color={color} />;
        break;
      case "cobweb":
        particles = <Cobweb num={num} bg={bg} color={color} />;
        break;
      case "polygon":
        particles = <Polygon num={num} bg={bg} color={color} />;
        break;
      case "square":
        particles = <Square num={num} bg={bg} color={color} />;
        break;
      case "tadpole":
        particles = <Tadpole num={num} bg={bg} color={color} />;
        break;
      case "fountain":
        particles = <Fountain num={num} bg={bg} color={color} />;
        break;
      case "random":
        particles = this.getRandom(num);
        break;

      default:
        particles = <Color num={num} bg={bg} color={color} />;
        break;
    }

    return particles;
  }

  render() {
    const particles = this.getBgParticles();
    return <React.Fragment>{particles}</React.Fragment>;
  }
}
