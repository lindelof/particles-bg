import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";
import { getColor } from "../utils/Color";

export default class Ball extends React.Component {
  constructor(props) {
    super(props);
    this.renderProton = this.renderProton.bind(this);
  }

  onCanvasInited(canvas, width, height) {
    this.createProton(canvas, width, height);
    this.createMiniEmitter(canvas);
    RAFManager.add(this.renderProton);
  }

  componentWillUnmount() {
    try {
      RAFManager.remove(this.renderProton);
      this.proton.destroy();
    } catch (e) { }
  }

  onResize() { }

  createProton(canvas, width, height) {
    const context = canvas.getContext("2d");
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(
      this.props.num ? new Proton.Span(this.props.num) : new Proton.Span(4, 9),
      new Proton.Span(0.8, 1.3)
    );

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(1, 50));
    emitter.addInitialize(new Proton.Life(5, 6));
    emitter.addInitialize(
      new Proton.Velocity(
        new Proton.Span(5, 8),
        new Proton.Span(30, 70),
        "polar"
      )
    );

    emitter.addBehaviour(new Proton.Alpha(1, 0));
    emitter.addBehaviour(
      new Proton.Color(["#36aaf3", "#fd769c", "#94ff22", "#ffa545", "#ffffff"])
    );
    emitter.addBehaviour(new Proton.Scale(0.7, 1));
    emitter.addBehaviour(new Proton.Gravity(3));
    emitter.addBehaviour(new Proton.Collision(emitter));
    emitter.addBehaviour(this.customDeadBehaviour(canvas));
    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "bound"
      )
    );

    emitter.p.x = Math.min(500, Math.max(canvas.width / 2 - 400, 50));
    emitter.p.y = canvas.height / 2 + 50;
    emitter.emit();
    this.proton.addEmitter(emitter);

    const renderer = new Proton.CanvasRenderer(canvas);
    renderer.onProtonUpdate =  ()=> {
      context.fillStyle = getColor(this.props.color, 0.2) || "rgba(255, 255, 255, 0.2)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };
    this.proton.addRenderer(renderer);
  }

  customDeadBehaviour(canvas) {
    return {
      initialize: function (particle) { },
      applyBehaviour: particle => {
        if (particle.p.y + particle.radius >= canvas.height) {
          if (particle.radius > 9) {
            this.miniEmitteing(particle);
            particle.dead = true;
          }
        }
      }
    };
  }

  createMiniEmitter(canvas) {
    const miniEmitter = new Proton.Emitter();
    miniEmitter.rate = new Proton.Rate(
      new Proton.Span(3, 6),
      new Proton.Span(1, 2)
    );

    miniEmitter.addInitialize(new Proton.Mass(1));
    miniEmitter.radiusInitialize = new Proton.Radius();
    miniEmitter.addInitialize(miniEmitter.radiusInitialize);
    miniEmitter.addInitialize(new Proton.Life(0.5, 1));
    miniEmitter.addInitialize(
      new Proton.V(
        new Proton.Span(1.5, 3),
        new Proton.Span(0, 70, true),
        "polar"
      )
    );

    miniEmitter.colorBehaviour = new Proton.Color("#ffffff");
    miniEmitter.addBehaviour(new Proton.Alpha(1, 0));
    miniEmitter.addBehaviour(miniEmitter.colorBehaviour);
    miniEmitter.addBehaviour(new Proton.Gravity(4));
    miniEmitter.addBehaviour(new Proton.Collision(miniEmitter));
    miniEmitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "bound"
      )
    );
    this.proton.addEmitter(miniEmitter);

    this.miniEmitter = miniEmitter;
  }

  miniEmitteing(particle) {
    const miniEmitter = this.miniEmitter;
    miniEmitter.radiusInitialize.reset(
      particle.radius * 0.05,
      particle.radius * 0.2
    );
    miniEmitter.colorBehaviour.reset(particle.color);
    miniEmitter.p.x = particle.p.x;
    miniEmitter.p.y = particle.p.y;
    miniEmitter.emit("once");
  }

  renderProton() {
    this.proton && this.proton.update();
  }

  render() {
    return (
      <Canvas bg={this.props.bg}
        globalCompositeOperation="darker"
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}
