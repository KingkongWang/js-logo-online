
const DEFAULT_PEN_SIZE = 1;              //默认画笔宽度
const DEFAULT_PEN_COLOR = 'white';       //默认画笔颜色
const DEFAULT_FILL_COLOR = "white";      //默认填充色



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
        this._color = value;
    }

    get color() {
        return this._color;
    }

    /**
     * 落笔
     */
    down() {
        this._isDown = true;
    } 

    /**
     * 抬笔
     */
    up() {
        this._isDown = false;
    }

    get isDown() {
        return this._isDown;
    }
 
    reset() {
        /**
         * 画笔尺寸
         */
        this._size = DEFAULT_PEN_SIZE;
        /**
         * 画笔颜色
         */
        this._color = DEFAULT_PEN_COLOR;

        
        /**
         * 是否落笔
         */
        this._isDown = true;
    }

}


export default Pen;