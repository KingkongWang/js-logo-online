import log from './Log';


class Context {
    constructor(app) {
        this.console = new ConsoleProxy(app);
        this.turtle = new TurtleProxy(app);
        this.pen = new PenProxy(app);
        this.screen = new ScreenProxy(app);
        this.text = new TextProxy(app);
    }
    // test() {
    //     // log.debug(mainState);
    //     // document.getElementById('game').contentWindow.mainState.startGame();
    //     let doc = document.getElementById('game').contentWindow.document;
    //     log.debug(doc);
    //     //加载js脚本

    //     // doc.write("<script>" + 
    //     // "game.States.change();" +
    //     // "<\/script>");

    // }
}

/**
 * TODO
 */
class ConsoleProxy {
    constructor(app) {
        this._app = app;
    }

    // log = (content) => {
    //     log.debug('-------');
    //     log.debug(content);
    //     this._app.addOutput(content);
    // }
}


class TurtleProxy {
    constructor(app) {
        this._app = app;
        this._engine = this._app.engine;
    }

    show() {
        this._engine.addCommand(() => {
            log.debug('show');
            this._engine.setTurtleVisible(true);
        });
    }

    hide() {
        this._engine.addCommand(() => {
            log.debug('hide');
            this._engine.setTurtleVisible(false);
        });
    }

    forward(dis) {
        this._engine.addCommand(() => {
            log.debug('forward');
            this._engine.line(dis);
        });
    }

    backward(dis) {
        this._engine.addCommand(() => {
            log.debug('backward');
            this._engine.line(-dis);
        });
    }

    right(angle) {
        this._engine.addCommand(() => {
            log.debug('right');
            this._engine.rotate(angle);
        });

    }

    left(angle) {
        this._engine.addCommand(() => {
            log.debug('left');
            this._engine.rotate(-angle);
        });
    }

    home() {
        this._engine.addCommand(() => {
            log.debug('home');
            this._engine.home();
        })
    }

    circle(radius) {
        this._engine.addCommand(() => {
            log.debug('circle');
            this._engine.circle(radius);
        })   
    }

    fillCircle(radius, color) {
        this._engine.addCommand(() => {
            log.debug('fillCircle');
            this._engine.fillCircle(radius, color);
        })   
    }

    rect(width, height) {
        this._engine.addCommand(() => {
            log.debug('rect');
            this._engine.rect(width, height);
        })   
    }

    fillRect(width, height, color) {
        this._engine.addCommand(() => {
            log.debug('fillRect');
            this._engine.fillRect(width, height, color);
        })   
    }

    text(content){
        this._engine.addCommand(() => {
            log.debug('text');
            this._engine.text(content);
        })  
    }
}

class PenProxy {
    constructor(app) {
        this._app = app;
        this._engine = this._app.engine;
    }

    /**
     * 落笔
     */
    down(){
        // this.app.execute(id);
        this._engine.addCommand(() => {
            log.debug('down');
            this._engine.penDown();
        })

    }

    /**
     * 抬笔
     */
    up(){
        this._engine.addCommand(() => {
            log.debug('up');
            this._engine.penUp();
        })
    }

    /**
     * 设置画笔颜色
     */
    setColor(color){
        this._engine.addCommand(() => {
            log.debug('setColor');
            this._engine.setPenColor(color);
        })
    }

    /**
     * 设置画笔宽度
     * @param {*} size 
     */
    setSize(size){
        this._engine.addCommand(() => {
            log.debug('setSize');
            this._engine.setPenSize(size);
        })

    }
}

class TextProxy{
    constructor(app) {
        this._app = app;
        this._engine = this._app.engine;
    }

    font(setting) {
        this._engine.addCommand(() => {
            log.debug('font');
            this._engine.font(setting);
        })
    }

    draw(content, x, y) {
        this._engine.addCommand(() => {
            log.debug('drawText');
            this._engine.drawText(content, x, y);
        })
    }
}

class ScreenProxy{
    constructor(app) {
        this.app = app;
        this.engine = this.app.engine;
    }

    clear() {
        this.engine.addCommand(() => {
            log.debug('screen clean');
            this.engine.clean();
        })
    }

    setColor(color) {
        this.engine.addCommand(() => {
            log.debug('set screen color ' + color);
            this.engine.setScreenColor(color);
        })
    }
}


export default Context;