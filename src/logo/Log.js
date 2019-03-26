export const LOG_LEVEL_DEBUG = 0;
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

    debug(str) {
        if(this._level > LOG_LEVEL_DEBUG) {
            return;
        }

        console.log('[debug]:' + str);
    }

    info(str) {
        if(this._level > LOG_LEVEL_INFO) {
            return;
        } 

        console.log('[info]:' + str);
    }

    
    warn(str) {
        if(this._level > LOG_LEVEL_WARN) {
            return;
        }

        console.log('[warn]:' + str);
    }
    
    error(str) {
        if(this._level > LOG_LEVEL_ERROR) {
            return;
        }

        console.log('[error]:' + str);
    }
    


}


let log = new Log();
export default log;
