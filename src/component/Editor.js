import React, { Component } from 'react';
//引入codemirror相关
import CodeMirror from 'codemirror';//核心库
import "codemirror/lib/codemirror.css"; //核心css
import "codemirror/mode/javascript/javascript"; //模式
import "codemirror/theme/dracula.css"; //皮肤

// 附件
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";


import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";  // 括号折叠
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";   // 边缘折叠符号

// lint
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/javascript-lint";  // 需要jslint配合
import "codemirror/addon/lint/lint.css";

// hint
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/javascript-hint.js";
// import "./logo-js-hint";  // 使用自定制的hint

// 滚动条
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'

import log from "../logo/Log";


class Editor extends Component {
    constructor() {
        super();
        this.editor = null;
    }

    componentDidMount() {
        this.context = this.props.context;

        this.editor = CodeMirror.fromTextArea(this.ref, {
            mode: "text/javascript",    // 实现js代码高亮
            lineNumbers: true,	        // 显示行号
            indentUnit: 4,              // 缩进单元
            tabSize: 4,                 // tab对应空格数
            theme: "dracula",	        // 设置主题

            // 括号相关
            matchBrackets: true,      // 自动显示括号匹配，需要配合 "codemirror/addon/edit/matchbrackets.js"
            autoCloseBrackets: true,  // 自动生成关闭括号，需要配合 "codemirror/addon/edit/closebrackets.js"

            // 折叠相关
            lineWrapping: true,       //代码折叠  // 未知，不设置也可以正常折叠
            foldGutter: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            //lint相关
            lint: true,
            extraKeys: { "Ctrl-/": "autocomplete" },  //ctrl-space唤起智能提示
            // 填充相关
            hintOptions: {
                // 不需要自动填充内容
                completeSingle: false,
                //  logo-js-hint补全配置
                useGlobalScope: true,
                globalScope: {
                    app: this.context,
                    Array: Array,
                    Boolean: Boolean,
                    Date: Date,
                    Number: Number, 
                    String: String,
                    Math: Math,
                    Object: Object,
                    RegExp: RegExp,
                    Function: Function
                },
                additionalContext: {
                }
            }
            
        });

        this.editor.setSize('100%', '100%');
        this.editor.on('change', this.onChanged);
        // this.editor.on('blur', this.onBlur);
        // this.editor.on('focus', this.onFocus);
    }

    // shouldComponentUpdate(nextProps) {
    //     if(this.props.initCode !== nextProps.initCode) {
    //         return true;
    //     }
    //     return false;
    // }

    componentDidUpdate() {
        if(this.editor && this.props.insertCode) {
            // this.editor.setValue(this.props.initCode);
            this.editor.replaceSelection(this.props.insertCode)
            this.editor.focus();
        }
    }

    // onFocus = (doc, evt) => {
    //     console.log(evt);
    // }

    // onBlur = (doc, evt) => {
    //     log.debug(evt);
    // }

    onChanged = (doc, change) => {
        log.debug(change);
        if (this.props.onChange && change.origin !== 'setValue') {
            if (change.origin === '+input') { // 输入字符监听
                if(change.text[0].length === 1) {  // 输入字符串
                    if ((change.text >= "a" && change.text <= "z")
                    || (change.text >= "A" && change.text <= "Z") || change.text === "."){
                        // 跳出提示
                        this.editor.showHint();
                    }
                }
            }

            this.props.onChange(doc.getValue(), change);
        }
    }

    render() {
        return (
            <div className="left">
                <textarea ref={(ref) => { this.ref = ref; }}
                    defaultValue={this.props.initCode ? this.props.initCode : ''}
                    autoFocus={true}>
                </textarea>
            </div>
        );

    }
}

export default Editor;