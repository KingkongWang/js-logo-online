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
        this.engine.init(this.visilazation, this.canvasDisplay, this.canvasScratch, 780, 780);
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
        // console.log('tick');
    }

    render() {

        return (
            <div id="visilazation" className="view" ref={(ref) => { this.visilazation = ref }}>
                <canvas id="canvas-display"
                        width="780px"
                        height="780px"
                        ref={(ref) => { this.canvasDisplay = ref }} />
                <canvas id="canvas-scratch"
                        style={{ display: 'none' }}
                        width="780px"
                        height="780px"
                        ref={(ref) => { this.canvasScratch = ref }} />
            </div>
        );

    }
}

export default Canvas;