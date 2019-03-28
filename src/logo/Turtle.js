class Turtle {
    // 海龟类构造函数
    constructor(initX, initY, image) {

        //初始坐标
        this._initX = initX;
        this._initY = initY;

        // 海龟坐标
        this._x = initX;
        this._y = initY;

        // 是否可见
        this._isVisible = true;

        // 海龟角度
        this._heading = 0;

        //海龟图片
        this._image = image;

    };

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    setVisible = (isVisible) => {
        this._isVisible = isVisible;
    }

    /**
     * 获取海龟旋转角度
     */
    get heading() {
        return this._heading;
    }

    //海龟位置重置
    home = () => {
        this._x = this._initX;
        this._y = this._initY;
        this._heading = 0;
    }

    //重置
    reset = () => {
        this._x = this._initX;
        this._y = this._initY;
        this._heading = 0;
        this._isVisible = true;
    }

    //旋转角度
    rotate = (angle) => {
        this._heading += angle;
    }

    //设置位置
    setPosition = (x, y) => {
        this._x = x;
        this._y = y;
    }

    //移动一段距离
    move = (distance) => {
        //将坐标根据角度和默认距离进行移动
        this._x += distance * Math.sin(2 * Math.PI * this._heading / 360);
        this._y -= distance * Math.cos(2 * Math.PI * this._heading / 360);
    }

    //绘制
    draw = (context) => {
        if (!this._isVisible) {
            return;
        }

        //绘制海龟图片
        context.translate(this._x, this._y);
        context.rotate((Math.PI / 180) * this._heading);   // 角度转换为弧度
        context.translate(-this._x, -this._y);
        context.drawImage(this._image, this._x - 17.5, this._y - 30, 35, 40);

    }

}

export default Turtle;