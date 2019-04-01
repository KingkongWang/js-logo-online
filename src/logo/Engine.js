import Turtle from "./Turtle";
import arrow from "../img/arrow.png";
import Pen from "./Pen";
// import log from './Log';


const DEFAULT_SCREEN_COLOR = "black";    //默认屏幕背景色
const DEFAULT_FONT = "18px SimHei";      //默认字体样式

class Engine {

	init(canvasDisplay, canvasScratch, canvasText, canvasTurtle, width, height) {

		/**
         * 画板宽度
         */
		this._width = width;

		/**
         * 画板高度
         */
		this._height = height;

		/**
         * 屏幕背景颜色
         */
		this._screenColor = DEFAULT_SCREEN_COLOR;


		/**
         * 默认字体样式
         */
		this._font = DEFAULT_FONT;


		/**
         * 是否是填充模式
         */
		this._fillMode = false;

		/**
         * 是否暂停
         */
		this._isPause = false;
        
		/**
         * 继续时间戳
         */
		this._continueTS = 0;


		/**
         * 绘制图层
         */
		this._layerBackgroud = canvasDisplay.getContext("2d");
		this._layerShape = canvasScratch.getContext("2d");
		this._layerText = canvasText.getContext("2d");
		this._layerTurtle = canvasTurtle.getContext("2d");

		/**
         * 操作指令
         */
		this._commandList = [];

		/**
         * 海龟初始化
         */
		let img = new Image();
		img.src = arrow;
		this._turtle = new Turtle(this._width / 2, this._height / 2, img);

		/**
         * 画笔                                                          
         */
		this._pen = new Pen();


		this.reset();

	}


	/**
     * 添加命令 
     */
	addCommand(func) {
		this._commandList.push(func);
	}

	/**
     * 暂停逻辑
     * @param {*} ms 
     */
	sleep(ms) {
		if(ms <= 0) {
			return;
		}
        
		this._continueTS = Date.now() + ms;
		this._isPause = true;
	}


	tick() {
		if(this._isPause) {

			if(Date.now() >= this._continueTS) {
				this._isPause = false;
				this._continueTS = 0;
			}

		} else {
			// 异步执行指令
			if (this._commandList.length > 0) {
				let func = this._commandList.shift();
				func();
				// 刷新
				this.display();
			}
		}



	}


	reset() {

		this._screenColor = DEFAULT_SCREEN_COLOR;
		this._font = DEFAULT_FONT;
		this._fillMode = false;
		this._isPause = false;
		this._continueTS = 0;

		// 背景层
		this._layerBackgroud.canvas.width = this._layerBackgroud.canvas.width;
		this._layerBackgroud.fillStyle = this._screenColor;
		this._layerBackgroud.fillRect(0, 0, this._width, this._height);

		// Shape层
		this._layerShape.canvas.width = this._layerShape.canvas.width;
		this._layerShape.strokeStyle = this._pen.color;
		this._layerShape.lineWidth = this._pen.size;
		this._layerShape.fillStyle = "rgba(255, 255, 255, 0)";
		this._layerShape.fillRect(0, 0, this._width, this._height);

		// 文本层
		this._layerText.canvas.width = this._layerText.canvas.width;
		this._layerText.fillStyle = "rgba(255, 255, 255, 0)";
		this._layerText.fillRect(0, 0, this._width, this._height);

		// 海龟层
		this._layerTurtle.canvas.width = this._layerTurtle.canvas.width;
		this._layerShape.fillStyle = "rgba(255, 255, 255, 0)";
		this._layerShape.fillRect(0, 0, this._width, this._height);

		// 清除所有剩余指令
		this._commandList = [];
		this._turtle.reset();
		this._pen.reset();

		this.display();
	}


	display() {
		// 清屏
		this._layerBackgroud.canvas.width = this._layerBackgroud.canvas.width;

		// 绘制背景
		this._layerBackgroud.fillStyle = this._screenColor;
		this._layerBackgroud.fillRect(0, 0, this._width, this._height);

		// 绘制图形层
		// this.layerBackgroud.globalAlpha = 1; // 设置为不透明,完全覆盖了下面的scratch canvas
		this._layerBackgroud.drawImage(this._layerShape.canvas, 0, 0);

		// 绘制文字层
		this._layerBackgroud.drawImage(this._layerText.canvas, 0, 0);

		// 绘制海龟
		this._layerTurtle.canvas.width = this._layerTurtle.canvas.width;
		this._turtle.draw(this._layerTurtle);
		this._layerBackgroud.drawImage(this._layerTurtle.canvas, 0, 0);
	}

    /**
     * 设置海龟可见度
     */
    setTurtleVisible = (isVisible) => {
    	this._turtle.setVisible(isVisible);
    }

    /**
     * 设置海龟位置
     */
    setTurtlePosition = (x, y) => {
    	if (x != null) {
    		this._turtle._x = x;
    	}
    	if (y != null) { 
    		this._turtle._y = y;
    	}
    }

    beginFill = () => {
    	let ctx = this._layerShape;
    	this._fillMode = true;
    	ctx.beginPath();
    	ctx.moveTo(this._turtle._x, this._turtle._y);

    }

    endFill = () => {
    	let ctx = this._layerShape;
    	//设置画笔颜色和尺寸
    	ctx.strokeStyle = this._pen.color;
    	ctx.lineWidth = this._pen.size;
    	ctx.fillStyle = this._pen.color;

    	ctx.closePath();
    	ctx.fill();
    	this._fillMode = false;
    }

    /**
     * 绘制直线
     */
    line = (distance) => {
    	let ctx = this._layerShape;
    	if (this._fillMode) {
    		//设置画笔颜色和尺寸
    		ctx.strokeStyle = this._pen.color;
    		ctx.lineWidth = this._pen.size;
    		this._turtle.move(distance);
    		ctx.lineTo(this._turtle._x, this._turtle._y);
    		ctx.stroke();
    	} else {
    		//设置画笔颜色和尺寸
    		ctx.strokeStyle = this._pen.color;
    		ctx.lineWidth = this._pen.size;


    		if (this._pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
    			ctx.beginPath();
    			ctx.moveTo(this._turtle._x, this._turtle._y);
    		}

    		//移动海龟
    		this._turtle.move(distance);
    		if (this._pen.isDown) {
    			ctx.lineTo(this._turtle._x, this._turtle._y);
    			ctx.stroke();
    		}
    	}

    }


    

    /**
     * 绘制矩形
     */
    drawRect = (width, height) => {
    	let ctx = this._layerShape;
    	//设置画笔颜色和尺寸
    	ctx.strokeStyle = this._pen.color;
    	ctx.lineWidth = this._pen.size;


    	if (this._pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
    		// ctx.beginPath();
    		// ctx.rect(this.turtle.x, this.turtle.y - height, width, height);
    		// ctx.stroke();
    		ctx.strokeRect(this._turtle._x, this._turtle._y - height, width, height);

    	}

    }

    /**
     * 绘制填充矩形
     */
    fillRect = (width, height) => {
    	let ctx = this._layerShape;

    	ctx.strokeStyle = this._pen.color;
    	ctx.lineWidth = this._pen.size;
    	ctx.fillStyle = this._pen.color;
    	if (this._pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
    		ctx.fillRect(this._turtle._x, this._turtle._y - height, width, height);

    		// ctx.beginPath();
    		// ctx.rect(this.turtle.x, this.turtle.y - height, width, height);
    		// ctx.closePath();
    		// ctx.fillStyle = color;
    		// ctx.fill("nonzero");
    		// ctx.stroke();
    	}
    }

    /**
     * 绘制圆形
     */
    drawCircle = (radius) => {
    	let ctx = this._layerShape;
    	//设置画笔颜色和尺寸
    	ctx.strokeStyle = this._pen.color;
    	ctx.lineWidth = this._pen.size;

    	if (this._pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制

    		// console.log(this._turtle.heading);
    		ctx.beginPath();
    		ctx.arc(this._turtle._x + radius, this._turtle._y, radius, 90, Math.PI / 2, true);
    		ctx.stroke();
    	}

    }

    /**
     * 绘制圆形
     */
    fillCircle = (radius) => {
    	let ctx = this._layerShape;
    	//设置画笔颜色和尺寸
    	ctx.strokeStyle = this._pen.color;
    	ctx.lineWidth = this._pen.size;
    	ctx.fillStyle = this._pen.color;

    	if (this._pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
    		ctx.beginPath();
    		ctx.arc(this._turtle._x + radius, this._turtle._y, radius, 90, Math.PI / 2, true);
    		ctx.closePath();
    		ctx.fill();
    	}

    }

    /**
     * 绘制文本
     */
    drawText = (content) => {
    	let ctx = this._layerText;
    	// 设置字体
    	ctx.font = this._font;
    	// 设置颜色
    	ctx.strokeStyle = this._pen.color;
    	ctx.fillStyle = this._pen.color;
    	// 设置水平对齐方式
    	ctx.textAlign = "start";
    	// 设置垂直对齐方式
    	// ctx.textBaseline = "top";

    	// ctx.fillText(content, this.turtle.x, this.turtle.y);
    	ctx.fillText(content, this._turtle._x, this._turtle._y);
    }

    /**
     * 设置字体
     */
    font = (setting) => {
    	this._font = setting;
    }




    setPenColor = (color) => {
    	this._pen.color = color;
    };

    //设置颜色
    setPenSize = (size) => {
    	this._pen.size = size;
    };


    //设置屏幕颜色
    setScreenColor = (color) => {
    	this._screenColor = color;
    };

    // 画笔抬起
    penUp = () => {
    	this._pen.up();
    };

    //画笔落下
    penDown = () => {
    	this._pen.down();
    };

    //清图形，海龟位置方向初始化
    cs = () => {
    	this.home();
    	this.clean();
    };

    //清图形，海龟不动
    clean = () => {

    	let temp = this._layerShape.strokeStyle;

    	this._layerShape.canvas.width = this._layerShape.canvas.width;
    	this._layerShape.canvas.height = this._layerShape.canvas.height;

    	this._layerShape.strokeStyle = temp;//因为清屏之后strokeStyle发生了变化

    	temp = this._layerText.strokeStyle;
    	this._layerText.canvas.width = this._layerText.canvas.width;
    	this._layerText.canvas.height = this._layerText.canvas.height;
    	this._layerText.strokeStyle = temp;


    };

    //海龟位置重置
    home = () => {
    	this._turtle.home();
    };

    // 旋转
    rotate = (angle) => {
    	this._turtle.rotate(angle);
    };



}

export default Engine;



