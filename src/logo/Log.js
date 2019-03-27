export const LOG_LEVEL_DEBUG  = 0;
export const LOG_LEVEL_INFO = 1;    
export const LOG_LEVEL_WARN = 2;   
export const LOG_LEVEL_ERROR = 3;    

/**
 * 简单的日志管理
 */
class Log {

    constructor() {
        this._level = LOG_LEVEL_INFO;
    }

    set level(lv) {
        this._level = lv;
    }

    translate(content) {
        if(typeof content === 'string') {
            return content;
        } else {
            return JSON.stringify(content);
        
        }
    }

    debug(content) {
        if(this._level > LOG_LEVEL_DEBUG) {
            return;
        }

        
        console.log('[debug]:' + this.translate(content));
    }

    info(content) {
        if(this._level > LOG_LEVEL_INFO) {
            return;
        } 

        console.log('[info]:' + this.translate(content));
    }

    
    warn(content) {
        if(this._level > LOG_LEVEL_WARN) {
            return;
        }

        console.log('[warn]:' + this.translate(content));
    }
    
    error(content) {
        if(this._level > LOG_LEVEL_ERROR) {
            return;
        }

        console.log('[error]:' + this.translate(content));
    }
    


}


let log = new Log();
export default log;
