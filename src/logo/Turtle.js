class Turtle {
    // 海龟类构造函数
    constructor(initX, initY, image) {

        //初始坐标
        this.initX = initX;
        this.initY = initY;

        // 海龟坐标
        this.x = initX;
        this.y = initY;

        // 是否可见
        this.isVisible = true;

        // 海龟角度
        this.heading = 0;

        //海龟图片
        this.image = image;

    };

    setVisible = (isVisible) => {
        this.isVisible = isVisible;
    }

    //海龟位置重置
    home = () => {
        this.x = this.initX;
        this.y = this.initY;
        this.heading = 0;
    }

    //重置
    reset = () => {
        this.x = this.initX;
        this.y = this.initY;
        this.heading = 0;
        this.isVisible = true;
    }

    //旋转角度
    rotate = (angle) => {
        this.heading += angle;
    }

    //设置位置
    setPosition = (x, y) => {
        this.x = x;
        this.y = y;
    }

    //移动一段距离
    move = (distance) => {
        //将坐标根据角度和默认距离进行移动
        this.x += distance * Math.sin(2 * Math.PI * this.heading / 360);
        this.y -= distance * Math.cos(2 * Math.PI * this.heading / 360);
    }

    //绘制
    draw = (context) => {
        if (!this.isVisible) {
            return;
        }

        //绘制海龟图片
        context.translate(this.x, this.y);
        context.rotate((Math.PI / 180) * this.heading);   // 角度转换为弧度
        context.translate(-this.x, -this.y);
        context.drawImage(this.image, this.x - 17.5, this.y - 30, 35, 40);

    }

}

export default Turtle;