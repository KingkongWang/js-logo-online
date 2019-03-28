
const DEFAULT_PEN_SIZE = 1;              //默认画笔宽度
const DEFAULT_PEN_COLOR = 'white';       //默认画笔颜色
const DEFAULT_FILL_COLOR = "white";      //默认填充色
const DEFAULT_TEXT_COLOR = 'white';      //默认文本颜色


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
        // TODO 填充色，描边色以及文本色暂时统一
        this._color = value;
        this._fillColor = value;
        this._textColor = value;
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
         * 填充色
         */
        this._fillColor = DEFAULT_FILL_COLOR;

        /**
         * 文本颜色
         */
        this._textColor = DEFAULT_TEXT_COLOR;
        
        /**
         * 是否落笔
         */
        this._isDown = true;
    }

}


export default Pen;