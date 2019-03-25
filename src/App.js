import React, { Component } from 'react';
import './App.css';

//引入bootstrap相关
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,ButtonGroup, Container, Row, Col } from 'reactstrap';

import Editor from './component/Editor';
import Canvas from './component/Canvas';
import SamplePanel from './component/SamplePanel';

import Interpreter from './logo/Interpreter';
import Context from './logo/Context';
import Engine from './logo/Engine';


class App extends Component {
  constructor() {
    super(); 
    this._engine = new Engine();  
    this._context = new Context(this);
    this._interpreter = new Interpreter(this._context);

    this.state = {
      initCode:'',
      currentCode:'',
    };

  }

  get engine() {
    return this._engine;
  }


  componentDidMount() {
 
  }

  onRun = () => {
    this._interpreter.eval(this.state.currentCode);
  }

  onReset = () => {
    this._engine.reset();

  }

  onCodeChage = (value, change) => {
    this.setState({currentCode:value});
  }

  /**
   * 切换示例代码
   */
  switchSample = (code) => {
    this.setState({initCode:code, currentCode:code});
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <div className="header">
              <ButtonGroup >
                <Button color="primary" onClick={this.onRun}>运行</Button>
                <Button color="primary" onClick={this.onReset}>重置</Button>
                <SamplePanel onSelected={this.switchSample}/>
              </ButtonGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Editor context={this._context} initCode={this.state.initCode} onChange={this.onCodeChage} />
          </Col>
          <Col>
            <Canvas engine={this._engine} />
          </Col>
        </Row>
        <div className="footer">
          <a href="https://github.com/KingkongWang/js-logo-online">github项目地址</a>
        </div>
      </Container>


    );
  }
}

export default App;
