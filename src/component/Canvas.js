import React, { Component } from 'react';

class Canvas extends Component {

    constructor(props) {
        super(props);
        this.engine = null;
        this.timer = null;
        this.interval = 30;
    }

    componentDidMount() {
        if(this.props.interval) {
            this.interval = this.props.interval;
        }
        this.engine = this.props.engine;
        this.engine.init(
            this.canvasDisplay, 
            this.canvasScratch, 
            this.canvasText, 
            this.canvasTurtle, 
            this.props.width, 
            this.props.height);
        this.timer = setInterval(() =>{
            this.tick();
        }, this.interval);        
    } 

    componentWillUnmount(){
        if(this.timer) {
            clearInterval (this.timer);
        }
    }

    tick() {
        this.engine.tick();
    }

    render() {
        return (
            <div id="visilazation" className="view" ref={(ref) => { this.visilazation = ref }}>
                <canvas id="canvas-display"
                        width={this.props.width + "px"}
                        height={this.props.height + "px"}
                        ref={(ref) => { this.canvasDisplay = ref }} />
                <canvas id="canvas-scratch"
                        style={{ display: 'none' }}
                        width={this.props.width + "px"}
                        height={this.props.height + "px"}
                        ref={(ref) => { this.canvasScratch = ref }} />
                <canvas id="layer-text"
                        style={{ display: 'none' }}
                        width={this.props.width + "px"}
                        height={this.props.height + "px"}
                        ref={(ref) => { this.canvasText = ref }} />
                <canvas id="layer-turtle"
                        style={{ display: 'none' }}
                        width={this.props.width + "px"}
                        height={this.props.height + "px"}
                        ref={(ref) => { this.canvasTurtle = ref }} />
                
            </div>
        );

    }
}

export default Canvas;