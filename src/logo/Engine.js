import Turtle from './Turtle';
import arrow from '../img/arrow.png';
import Pen from './Pen';


const DEFAULT_SCREEN_COLOR = 'black';    //默认屏幕背景色

class Engine {

    // constructor(visilization, canvasDisplay, canvasScratch, width, height) {

    //     /**
    //      * 海龟
    //      * @type {null}
    //      */
    //     this.turtle = null;

    //     /**
    //      * 画笔                                                          
    //      */
    //     this.pen = new Pen();

    //     /**
    //      * 是否需要刷新
    //      */
    //     // this.needRefresh = true;
    

    //     /**
    //      * 屏幕背景颜色
    //      */
    //     this.screenColor = DEFAULT_SCREEN_COLOR;

    //     this.width = width;

    //     this.height = height;

    //     this.visilization = visilization;
    //     this.ctxDisplay = canvasDisplay.getContext('2d');
    //     this.ctxScratch = canvasScratch.getContext('2d');

    //     // 异步命令
    //     this.commands = [];

    //     this.init();

    // }

    /**
     * 添加异步命令 
     */
    addCommand(command){
        this.commands.push(command);
    }


    init(visilization, canvasDisplay, canvasScratch, width, height){
        /**
         * 海龟
         * @type {null}
         */
        this.turtle = null;

        /**
         * 画笔                                                          
         */
        this.pen = new Pen();

        /**
         * 是否需要刷新
         */
        // this.needRefresh = true;
    

        /**
         * 屏幕背景颜色
         */
        this.screenColor = DEFAULT_SCREEN_COLOR;

        this.width = width;

        this.height = height;

        this.visilization = visilization;
        this.ctxDisplay = canvasDisplay.getContext('2d');
        this.ctxScratch = canvasScratch.getContext('2d');

        // 异步命令
        this.commands = [];

        // this.init();
        // 载入海龟
        let img = new Image();
        img.src = arrow;
        this.turtle = new Turtle(this.width / 2, this.height / 2, img);
        this.reset();
    };


    tick() {
        // 异步执行指令
        if (this.commands.length > 0) {
            let func = this.commands.shift();
            func();
        }
        // if(this.needRefresh) {
        this.display();
        //     this.needRefresh = false;
        // }


    }


    //重置主函数
    reset(){
        // 清除所有剩余指令
        this.commands = [];

        this.turtle.reset();
        this.pen.reset();
    
        this.screenColor = DEFAULT_SCREEN_COLOR;        //背景色

        // 清除canvas并重新设置样式
        this.ctxScratch.canvas.width = this.ctxScratch.canvas.width;
        this.ctxScratch.strokeStyle = this.pen.color;//this.penColor;
        this.ctxScratch.lineWidth = this.pen.size;//this.penSize;
        this.ctxScratch.fillStyle = this.screenColor;
        this.ctxScratch.fillRect(0, 0, this.width, this.height);
        
    };

    /**
     * 将草稿上的图像绘制到canvas上
     */
    display(){
        // 清屏
        this.ctxDisplay.canvas.width = this.ctxDisplay.canvas.width;

        // 绘制背景
        this.ctxDisplay.fillStyle = this.screenColor;
        this.ctxDisplay.fillRect(0, 0, this.width, this.height);

        // 将草稿绘制到图层上
        this.ctxDisplay.globalAlpha = 1; 								// 设置为不透明,完全覆盖了下面的scratch canvas
        this.ctxDisplay.drawImage(this.ctxScratch.canvas, 0, 0); 

        //把海龟绘制在实际画板上
        this.turtle.draw(this.ctxDisplay);
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
        let ctx = this.ctxScratch;
        //设置画笔颜色和尺寸
        ctx.strokeStyle = this.pen.color;
        ctx.lineWidth = this.pen.size;


        if (this.pen.isDown) {  //判断画笔是否抬起,若落下状态则进行绘制
            ctx.beginPath();
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
        console.log('bg:' + color);
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

        let temp = this.ctxScratch.strokeStyle;
        this.ctxScratch.canvas.width = this.ctxScratch.canvas.width;
        this.ctxScratch.canvas.height = this.ctxScratch.canvas.height;
        this.ctxScratch.strokeStyle = temp;//因为清屏之后strokeStyle发生了变化

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



