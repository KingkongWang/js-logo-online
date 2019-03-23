import React, { Component } from 'react';
import './App.css';

//引入bootstrap相关
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'reactstrap';
import Editor from './component/Editor';
import Canvas from './component/Canvas';
import Interpreter from './logo/Interpreter';

import Context from './logo/Context';

// 范例
import {Sample1, Sample2} from './logo/Sample';
import Engine from './logo/Engine';


class App extends Component {
  constructor() {
    super(); 
    this._engine = new Engine();  // 游戏引擎
    this._context = new Context(this);
    this._interpreter = new Interpreter(this._context);
    this.state = {
      output:'',
      initCode:Sample1,
      code:Sample1,
    };


  }

  get engine() {
    return this._engine;
  }

  addOutput(text) {
    this.setState(prevState => ({
      output: prevState.output  + text + '\n'
    }));
  }

  componentDidMount() {
    console.log('init end');
  }

  onRun = () => {
    // console.log(this.state);
    this._interpreter.eval(this.state.code);
  }

  onReset = () => {
    this._engine.reset();

  }

  onCodeChage = (value, change) => {
    this.setState({code:value});
    // this.code = value;
    // console.log(value);
  }
  
  // onViewDidMount = (engine) => {
  //   this.engine = engine;
  //   console.log('mount engine');
  // }

  render() {
    
    return (

      <Container fluid={true}>
        <Row>
          <Col>
            <div className="header">
              {/* <Button color="primary">run</Button>{' '}
              <Button color="secondary">secondary</Button>{' '} */}
              <Button color="success" onClick={this.onRun}>run</Button>{' '}
              <Button color="success" onClick={this.onReset}>reset</Button>{' '}
              {/* <Button color="info">info</Button>{' '}
              <Button color="warning">warning</Button>{' '}
              <Button color="danger">danger</Button>{' '}
              <Button color="link">link</Button> */}
            </div></Col>
        </Row>
        <Row>
          <Col><Editor context={this._context} initCode={this.state.initCode} onChange={this.onCodeChage}></Editor></Col>
          <Col><Canvas engine={this._engine}></Canvas></Col>
        </Row>
        <div className="footer">By KingkongWang</div>
      </Container>


    );
  }
}

export default App;
