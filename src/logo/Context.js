
class Context {
    constructor(app) {
        this.console = new ConsoleProxy(app);
        this.turtle = new TurtleProxy(app);
        this.pen = new PenProxy(app);
        this.screen = new ScreenProxy(app);
    }
    test() {
        // console.log(mainState);
        // document.getElementById('game').contentWindow.mainState.startGame();
        let doc = document.getElementById('game').contentWindow.document;
        console.log(doc);
        //加载js脚本

        // doc.write("<script>" + 
        // "game.States.change();" +
        // "<\/script>");

    }
}


class ConsoleProxy {
    constructor(app) {
        this._app = app;
    }

    log = (content) => {
        console.log('-------');
        console.log(content);
        this._app.addOutput(content);
    }
}


class TurtleProxy {
    constructor(app) {
        this._app = app;
        this._engine = this._app.engine;
    }

    show() {
        this._engine.addCommand(() => {
            console.log('show');
            this._engine.turtle.setVisible(true);
        });
    }

    hide() {
        this._engine.addCommand(() => {
            console.log('hide');
            this._engine.turtle.setVisible(false);
        });
    }

    forward(dis) {
        this._engine.addCommand(() => {
            console.log('forward');
            this._engine.line(dis);
        });
    }

    backward(dis) {
        this._engine.addCommand(() => {
            console.log('backward');
            this._engine.line(-dis);
        });
    }

    right(angle) {
        this._engine.addCommand(() => {
            console.log('right');
            this._engine.rotate(angle);
        });

    }

    left(angle) {
        this._engine.addCommand(() => {
            console.log('left');
            this._engine.rotate(-angle);
        });
    }

    home() {
        this._engine.addCommand(() => {
            console.log('home');
            this._engine.home();
        })
    }
}

class PenProxy {
    constructor(app) {
        this._app = app;
        this._engine = this._app.engine;
    }

    // 落笔
    down(){
        // this.app.execute(id);
        this._engine.addCommand(() => {
            console.log('down');
            this._engine.penDown();
        })

    }

    // 抬笔
    up(){
        this._engine.addCommand(() => {
            console.log('up');
            this._engine.penUp();
        })
    }

    // 设置color
    setColor(color){
        this._engine.addCommand(() => {
            console.log('setColor');
            this._engine.setPenColor(color);
        })
    }

        // 设置背景color
    setSize(size){
        this._engine.addCommand(() => {
            console.log('setSize');
            this._engine.setPenSize(size);
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
            console.log('clean');
            this.engine.clean();
        })
    }
}


export default Context;