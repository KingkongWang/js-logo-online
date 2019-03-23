
const DEFAULT_PEN_SIZE = 1;             //默认画笔宽度
const DEFAULT_PEN_COLOR = 'white';       //默认画笔颜色
const DEFAULT_SCREEN_COLOR = 'black';    //默认屏幕背景色

class Pen {


    constructor(){
        this.reset();
    }

    set size(value) {
        this._size = value;
    }

    get size() {
        return this._size;
    }

    set color(value) {
        console.log('setcolor:' + value);
        this._color = value;
    }

    get color() {
        console.log('getcolor:' + this._color);
        return this._color;
    }

    down() {
        this._isDown = true;
    } 

    up() {
        this._isDown = false;
    }

    get isDown() {
        return this._isDown;
    }
 
    reset() {
        this._size = DEFAULT_PEN_SIZE;
        this._color = DEFAULT_PEN_COLOR;
        this._isDown = true;
    }

}


export default Pen;