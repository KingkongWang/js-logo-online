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





class Editor extends Component {
    constructor() {
        super();
        this.editor = null;
    }

    componentDidMount() {
        this.context = this.props.context;

        this.editor = CodeMirror.fromTextArea(this.ref, {
            mode: "text/javascript",    //实现js代码高亮
            lineNumbers: true,	        //显示行号
            indentUnit: 4,              // 缩进单元
            tabSize: 4,                 // tab对应空格数
            theme: "dracula",	        //设置主题

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

        // this.editor.on("cursorActivity", function () {
        //     //获取用户当前的编辑器中的编写的代码
        //     var words = editor.getValue() + "";
        //     //利用正则取出用户输入的所有的英文的字母
        //     words = words.replace(/[a-z]+[\-|\']+[a-z]+/ig, '').match(/([a-z]+)/ig);
        //     //将获取到的用户的单词传入CodeMirror,并在javascript-hint中做匹配
        //     CodeMirror.ukeys = words;
        //     //调用显示提示
        //     // editor.showHint();
        // });
    }

    cursorActivity = () => {

    }

    onChanged = (doc, change) => {
        // console.log(change);
        if (this.props.onChange && change.origin !== 'setValue') {
            if (change.origin === '+input') { // 输入字符监听
                if ((change.text >= "a" && change.text <= "z")
                    || (change.text >= "A" && change.text <= "Z") || change.text == "."){
                        // 跳出提示
                        // this.editor.showHint({
                        //     globalScope:this.globalScope,
                        //     useGlobalScope:true,
                        //     additionalContext:this.additionalContext
                        //     // {
                        // //     "app":appScope
                        // //   }
                        // });

                        this.editor.showHint();
                    }
                    // this.editor.showHint();
                // console.log(change);
            }

            this.props.onChange(doc.getValue(), change);
        }
    }

    // componentWillReceiveProps: function (nextProps) {
    // 	if (this.codeMirror && nextProps.value !== undefined && nextProps.value !== this.props.value && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
    // 		if (this.props.preserveScrollPosition) {
    // 			var prevScrollPosition = this.codeMirror.getScrollInfo();
    // 			this.codeMirror.setValue(nextProps.value);
    // 			this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
    // 		} else {
    // 			this.codeMirror.setValue(nextProps.value);
    // 		}
    // 	}
    // 	if (typeof nextProps.options === 'object') {
    // 		for (let optionName in nextProps.options) {
    // 			if (nextProps.options.hasOwnProperty(optionName)) {
    // 				this.setOptionIfChanged(optionName, nextProps.options[optionName]);
    // 			}
    // 		}
    // 	}
    // },

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