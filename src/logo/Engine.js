import Turtle from './Turtle';
import arrow from '../img/arrow.png';
import Pen from './Pen';



const DEFAULT_SCREEN_COLOR = 'black';    //默认屏幕背景色

class Engine {

    init(canvasDisplay, canvasScratch, canvasTurtle, width, height) {
         
        this.width = width;

        this.height = height;

        /**
         * 画笔                                                          
         */
        this.pen = new Pen();
    
        /**
         * 屏幕背景颜色
         */
        this.screenColor = DEFAULT_SCREEN_COLOR;


        this.layerBackgroud = canvasDisplay.getContext('2d');
        this.layerShape = canvasScratch.getContext('2d');
        this.layerTurtle = canvasTurtle.getContext('2d');

        /**
         * 异步操作指令
         */
        this.commandList = [];

        this.shapeList = [];

        /**
         * 海龟初始化
         */
        let img = new Image();
        img.src = arrow;
        this.turtle = new Turtle(this.width / 2, this.height / 2, img);
    
        this.reset();
        this.display();
    };


    /**
     * 添加异步命令 
     */
    addCommand(command){
        this.commandList.push(command);
    }


    tick() {
        // 异步执行指令
        if (this.commandList.length > 0) {
            let func = this.commandList.shift();
            func();
            // 刷新
            this.display();
        }
    

    }


    // 重置主函数
    reset(){
        // 清除所有剩余指令
        this.commandList = [];

        this.turtle.reset();
        this.pen.reset();
    
        this.screenColor = DEFAULT_SCREEN_COLOR;        //背景色

        // 背景层
        this.layerBackgroud.canvas.width = this.layerBackgroud.canvas.width;
        this.layerBackgroud.fillStyle = this.screenColor;
        this.layerBackgroud.fillRect(0, 0, this.width, this.height);

        // Shape层
        this.layerShape.canvas.width = this.layerShape.canvas.width;
        this.layerShape.strokeStyle = this.pen.color;
        this.layerShape.lineWidth = this.pen.size;
        this.layerShape.fillStyle = 'rgba(255, 255, 255, 0)';//this.screenColor;
        this.layerShape.fillRect(0, 0, this.width, this.height );

        // 对象层
        this.layerTurtle.canvas.width = this.layerTurtle.canvas.width;
        this.layerShape.fillStyle = 'rgba(255, 255, 255, 0)';//this.screenColor;
        this.layerShape.fillRect(0, 0, this.width, this.height );
        
    };


    display(){
        // 清屏
        this.layerBackgroud.canvas.width = this.layerBackgroud.canvas.width;

        // 绘制背景
        this.layerBackgroud.fillStyle = this.screenColor;
        this.layerBackgroud.fillRect(0, 0, this.width, this.height);

        // 绘制图形层
        // this.layerBackgroud.globalAlpha = 1; // 设置为不透明,完全覆盖了下面的scratch canvas
        this.layerBackgroud.drawImage(this.layerShape.canvas, 0, 0); 

        // 绘制海龟
        this.layerTurtle.canvas.width = this.layerTurtle.canvas.width;
        this.turtle.draw(this.layerTurtle);
        this.layerBackgroud.drawImage(this.layerTurtle.canvas, 0, 0); 
    };

    /**
     * 设置海龟可见度
     */
    setTurtleVisible = (isVisible) => {
        this.turtle.setVisible(isVisible);
    }                                                                                                                                        

    /**
     * 设置海龟位置
     */
    setTurtlePosition = (x, y) => {
        if (x != null) {
            this.turtle.x = x;
        }
        if (y != null) {
            this.turtle.y = y;
        }
    }

    line = (distance) => {
        let ctx = this.layerShape;
        //设置画笔颜色和尺寸
        ctx.strokeStyle = this.pen.color;
        ctx.lineWidth = this.pen.size;


        if (this.pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
            // ctx.beginPath();
            ctx.moveTo(this.turtle.x, this.turtle.y);
        }

        //移动海龟
        this.turtle.move(distance);

        if (this.pen.isDown) {
            ctx.lineTo(this.turtle.x, this.turtle.y);
            ctx.stroke();
        }
    };

    setPenColor = (color) => {
        this.pen.color = color;
    };

    //设置颜色
    setPenSize = (size) => {
        this.pen.size = size;
    };


    //设置屏幕颜色
    setScreenColor = (color) => {
        this.screenColor = color;
    };

    // 画笔抬起
    penUp = () => {
        this.pen.up();
    };

    //画笔落下
    penDown = () => {
        this.pen.down();
    };

    //清图形，海龟位置方向初始化
    cs = () => {
        this.home();
        this.clean();
    };

    //清图形，海龟不动
    clean = () => {

        let temp = this.layerShape.strokeStyle;

        this.layerShape.canvas.width = this.layerShape.canvas.width;
        this.layerShape.canvas.height = this.layerShape.canvas.height;
        
        this.layerShape.strokeStyle = temp;//因为清屏之后strokeStyle发生了变化

    };

    //海龟位置重置
    home = () => {
        this.turtle.home();
    };

    // 旋转
    rotate = (angle) => {
        this.turtle.rotate(angle);
    };



}

export default Engine;



