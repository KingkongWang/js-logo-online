import React, { Component } from "react";
import "./App.css";

//引入bootstrap相关
import "bootstrap/dist/css/bootstrap.min.css";
import { Button,ButtonGroup, Container, Row, Col } from "reactstrap";

// import Immutable from 'immutable';

import Editor from "./component/Editor";
import Canvas from "./component/Canvas";
import CommandMenu from "./component/CommandMenu";

import Interpreter from "./logo/Interpreter";
import Context from "./logo/Context";
import Engine from "./logo/Engine";
import log, {LOG_LEVEL_DEBUG} from "./logo/Log";

import Consts from "./logo/Consts";


class App extends Component {
	constructor() {
		super(); 
		// 设置日志级别
		log.level = LOG_LEVEL_DEBUG;
		this._engine = new Engine();  
		this._context = new Context(this);
		this._interpreter = new Interpreter(this._context);
		this._currentCode = "";

		this.state = {
			initCode:"",
			insertCode:"",
			canvasWidth: 800,
			canvasHeight: 800
		};

	}

	get engine() {
		return this._engine;
	}


	componentDidMount() {
 
	}

  onRun = () => {
  	this._interpreter.eval(this._currentCode);
  }

  onReset = () => {
  	this._engine.reset();

  }

  onCodeChage = (value) => {
  	this._currentCode = value;
  }

  /**
   * 切换示例代码
   */
  insertCode = (code) => {
  	this.setState({insertCode:code});
  }
  
  /**
   * 插入指令
   */
  insertCommand = (code) => {
  	alert(code);
  }

  render() {
  	// console.log("reader app");
  	return (
  		<Container fluid={true}>
  			<Row>
  				<Col>
  					<div className="header">
  						<ButtonGroup >
  							<Button color="secondary" onClick={this.onRun}>运行</Button>
  							<Button color="secondary" onClick={this.onReset}>重置</Button>
  							<CommandMenu 
  								label={Consts.SampleMenuLabel}
  								commandList={Consts.Samples} 
  								onSelected={this.insertCode}/>
  						</ButtonGroup>
  					</div>
  				</Col>
  				<Col>
  					<ButtonGroup>
  						<CommandMenu label={Consts.SystemMenuLabel} commandList={Consts.SystemCommands} onSelected={this.insertCode}/>
  						<CommandMenu label={Consts.TurtleMenuLabel} commandList={Consts.TurtleCommands} onSelected={this.insertCode}/>
  						<CommandMenu label={Consts.TurtleMenuLabel} commandList={Consts.PenCommands} onSelected={this.insertCode}/>
  						<CommandMenu label={Consts.TextMenuLabel} commandList={Consts.TextCommands} onSelected={this.insertCode}/>
  					</ButtonGroup>
  				</Col>
  			</Row>
  			<Row>
  				<Col>
  					<Editor context={this._context} insertCode={this.state.insertCode} onChange={this.onCodeChage} />
  				</Col>
  				<Col>
  					<Canvas engine={this._engine} width={this.state.canvasWidth} height={this.state.canvasHeight}/>
  				</Col>
  			</Row>
  			<div className="footer">
  				<a href="https://github.com/KingkongWang/js-logo-online" style={{color:"#FFFFFF"}}>github项目地址</a>
  			</div>
  		</Container>


  	);
  }
}

export default App;
