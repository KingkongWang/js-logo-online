import * as BabelStandlone from "babel-standalone";

/**
 * 解释器
 */
class Interpreter {
    constructor(context) {
        this.context = context;

    }

    wrapper(content) {
        return '(function(){ return (app) => {' +
             content +
             '}})();';
    }

    translate(input) {
        let output = BabelStandlone.transform(input, { presets: ['es2015'] }).code;
        return output;
    }


    eval(input) {
        console.log('input:' + input);
        try{

            let code = this.translate(input);
            console.log(code);
            let code2 = this.wrapper(code);
            console.log(code2);
            let func = eval(code2);
            console.log(func);
            func(this.context);

        }catch(err) {
            console.log(err);
            alert(err);
        }

    }
}



export default Interpreter;

