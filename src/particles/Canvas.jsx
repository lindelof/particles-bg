import React from "react";
import RAFManager from "raf-manager";
export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this._iid = 0;
    this._oid = 0;
    this.size = { width: 0, height: 0 };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this._oid = setTimeout(() => {
      this.initCanvas();
      this.resize = this.resize.bind(this);
      window.addEventListener("resize", this.resize);
    }, 100);

    const canvas = this.getCanvas();
    this.props.onCanvasDidMount && this.props.onCanvasDidMount(canvas);
  }

  initCanvas() {
    const canvas = this.getCanvas();

    if (this.props.globalCompositeOperation) {
      const context = canvas.getContext("2d");
      context.globalCompositeOperation = this.props.globalCompositeOperation;
    }

    const { width, height } = this.setCanvasSize(canvas);
    this.heartbeatDetectionCanvasSize(canvas);
    this.props.onCanvasInited(canvas, width, height);
  }

  getCanvas(){
    const canvas = this.canvasRef.current;
    return canvas;
  }

  heartbeatDetectionCanvasSize(canvas) {
    this._iid = setInterval(() => {
      if(this.canvasRef.current){
        const newHeight = this.canvasRef.current.clientHeight;
        if (newHeight !== this.size.height) {
          const { width, height } = this.setCanvasSize(canvas);
          this.props.onResize && this.props.onResize(width, height);
        }
      }
    }, 1000 / 10);
  }

  componentWillUnmount() {
    try{
      window.removeEventListener("resize", this.resize);
      clearInterval(this._iid);
      clearTimeout(this._oid);
    }catch(e){
    }
  }

  resize() {
    const canvas = this.getCanvas();
    const { width, height } = this.setCanvasSize(canvas);
    this.props.onResize && this.props.onResize(width, height);
  }

  setCanvasSize(canvas) {
    const width = this.canvasRef.current.clientWidth;
    const height = this.canvasRef.current.clientHeight;

    this.size.width = width;
    this.size.height = height;
    canvas.width = width;
    canvas.height = height;
    return { width, height };
  }

  handleWaypointEnter() {
    RAFManager.start();
  }

  handleWaypointLeave() {
    RAFManager.stop();
  }

  getStyle() {
    const { bg } = this.props;
    let style = { width: "100%", height: "100%" };

    if (bg === true) {
      style = Object.assign(style, {
        position: "absolute",
        zIndex: -1,
        top: 0,
        left: 0
      });
    } else if(bg && typeof bg === "object") {
      style = Object.assign(style, bg);
    }

    return style;
  }

  handleMouseDown(e) {
    this.props.onMouseDown && this.props.onMouseDown(e);
  }

  render() {
    return (
      <canvas className="particles-bg-canvas-self"
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown.bind(this)}
        style={this.getStyle()}
      />
    );
  }
}
