import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Color extends React.Component {
    constructor(props) {
        super(props);

        this.colors = [
            "#529B88",
            "#CDD180",
            "#FFFA32",
            "#FB6255",
            "#FB4A53",
            "#FF4E50",
            "#F9D423"
        ];
        this.renderProton = this.renderProton.bind(this);
    }

    componentWillUnmount() {
        try {
            RAFManager.remove(this.renderProton);
            this.proton.destroy();
        } catch (e) { }
    }

    onCanvasInited(canvas, width, height) {
        this.createProton(canvas, width, height);
        RAFManager.add(this.renderProton);
    }

    onResize(width, height) {
        this.crossZoneBehaviour.zone.width = width;
        this.crossZoneBehaviour.zone.height = height;
        this.proton.renderers[0].resize(width, height);;
    }

    getProp(key, defaultVal) {
        const config = this.props.config || {};
        const val = config[key] || defaultVal;
        if (Array.isArray(val)) {
            return new Proton.Span(val[0], val[1]);
        } else {
            return val;
        }
    }

    getArrProp(key, defaultVal) {
        const config = this.props.config || {};
        const val = config[key] || defaultVal;
        if (!val) return null;

        if (Array.isArray(val)) {
            return val;
        } else {
            return [val, val];
        }
    }

    createProton(canvas, width, height) {
        const num = this.getProp("num", [5, 8]);
        const rps = this.getProp("rps", [0.1, 0.2]);
        const mass = this.getProp("mass", 1);
        const radius = this.getProp("radius", [10, 30]);
        const life = this.getProp("life", [2, 3]);
        const body = this.getProp("body");
        const position = this.getProp("position");
        const v = this.getProp("v", [2, 3]);
        const tha = this.getProp("tha", [-15, 15]);
        const alpha = this.getArrProp("alpha");
        const scale = this.getArrProp("scale");
        const color = this.getArrProp("color");
        const cross = this.getProp("cross", "dead");
        const random = this.getProp("random");
        const rotate = this.getArrProp("rotate");
        const g = this.getProp("g");
        const f = this.getArrProp("f");
        const emitterV = this.getProp("emitter");

        this.proton = new Proton();
        let emitter;
        if (emitterV === "follow") {
            emitter = new Proton.FollowEmitter();
        } else {
            emitter = new Proton.Emitter();
        }
        emitter.rate = new Proton.Rate(num, rps);

        emitter.addInitialize(new Proton.Mass(mass));
        emitter.addInitialize(new Proton.Radius(radius));
        emitter.addInitialize(new Proton.Life(life));
        emitter.addInitialize(new Proton.Velocity(v, tha, "polar"));
        if (body) emitter.addInitialize(new Proton.Body(body));

        let pos;
        if (position === "all" || position === "screen") {
            pos = new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height))
        } else if (typeof position === "object") {
            pos = new Proton.Position(new Proton.RectZone(position.x, position.y, position.width, position.height))
        } else {
            emitter.p.x = canvas.width / 2;
            emitter.p.y = canvas.height / 2;
        }

        emitter.addInitialize(pos);

        /// behaviour
        const alphaB = alpha ? new Proton.Alpha(alpha[0], alpha[1]) : new Proton.Alpha(0, 1);
        const scaleB = scale ? new Proton.Scale(scale[0], scale[1]) : new Proton.Scale(1, 0.2);
        const colorB = color ? new Proton.Color(color[0], color[1]) : new Proton.Color(this.colors);

        emitter.addBehaviour(alphaB);
        emitter.addBehaviour(scaleB);
        if(!body) emitter.addBehaviour(colorB);

        if(rotate){
            if(rotate[0]===true||rotate[0]==="rotate"){
                emitter.addBehaviour(new Proton.Rotate());
            }else{
                emitter.addBehaviour(new Proton.Rotate(rotate[0], rotate[1]));
            }
        }

        const zone = new Proton.RectZone(0, 0, canvas.width, canvas.height)
        const crossZoneBehaviour = new Proton.CrossZone(zone, cross);
        emitter.addBehaviour(crossZoneBehaviour);

        random && emitter.addBehaviour(new Proton.RandomDrift(random, random, 0.05));
        g && emitter.addBehaviour(new Proton.G(g));
        f && emitter.addBehaviour(new Proton.F(f[0], f[1]));

        emitter.emit();
        this.proton.addEmitter(emitter);

        const renderer = this.createRenderer(canvas);
        this.proton.addRenderer(renderer);

        this.emitter = emitter;
        this.crossZoneBehaviour = crossZoneBehaviour;
    }

    createRenderer(canvas) {
        const width = canvas.width;
        const height = canvas.height;
        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);

        const onUpdate = this.getProp("onUpdate");
        if (onUpdate) {
            renderer.onProtonUpdate = () => {
                onUpdate(context, width, height);
            };
        }

        const onParticleCreated = this.getProp("onParticleCreated");
        if (onParticleCreated) {
            renderer.onParticleCreated = (particle) => {
                onParticleCreated(context, particle);
            };
        }

        const onParticleUpdate = this.getProp("onParticleUpdate");
        if (onParticleUpdate) {
            renderer.onParticleUpdate = (particle) => {
                onParticleUpdate(context, particle);
            };
        }

        return renderer;
    }

    renderProton() {
        this.proton && this.proton.update();
    }

    handleMouseDown(e) {
        const onMouseDown = this.getProp("onMouseDown");
        if (onMouseDown) {
            onMouseDown(e);
        }
    }

    render() {
        const globalCompositeOperation = this.props.globalCompositeOperation || this.props.operation || "source-over";

        return (
            <Canvas
                bg={this.props.bg}
                onMouseDown={this.handleMouseDown.bind(this)}
                globalCompositeOperation={globalCompositeOperation}
                onCanvasInited={this.onCanvasInited.bind(this)}
                onResize={this.onResize.bind(this)}
            />
        );
    }
}
