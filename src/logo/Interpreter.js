import * as BabelStandlone from "babel-standalone";
import log from './Log';
/**
 * 解释器
 */
class Interpreter {

    constructor(context) {
        this.context = context;
    }

    wrapper(content) {
        return '(function(){ return function(app){\n' +
             content + 
             '\n}})();';
    }

    /**
     * 动态转换为es5代码
     */
    translate(input) {
        let output = BabelStandlone.transform(input, { 
            presets: ['es2015'] 
        
        }).code;
        return output;
    }

    eval(input) {
        try{

            let code = this.translate(input);
            log.debug(code);
            code = this.wrapper(code);
            let func = eval(code);
            log.debug(func);
            func(this.context);

        }catch(err) {
            log.error(err);
            alert(err);
        }

    }
}



export default Interpreter;

