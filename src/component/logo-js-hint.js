// /**
//  * 由codemirror/addon/hint/javascript-hint.js修改而来
//  */
// import CodeMirror from 'codemirror';//核心库

// var Pos = CodeMirror.Pos;

// function forEach(arr, f) {
//   for (var i = 0, e = arr.length; i < e; ++i) f(arr[i]);
// }

// function arrayContains(arr, item) {
//   if (!Array.prototype.indexOf) {
//     var i = arr.length;
//     while (i--) {
//       if (arr[i] === item) {
//         return true;
//       }
//     }
//     return false;
//   }
//   return arr.indexOf(item) != -1;
// }

// function scriptHint(editor, keywords, getToken, options) {
//   // Find the token at the cursor
//   var cur = editor.getCursor(), token = getToken(editor, cur);
//   if (/\b(?:string|comment)\b/.test(token.type)) return;
//   var innerMode = CodeMirror.innerMode(editor.getMode(), token.state);
//   if (innerMode.mode.helperType === "json") return;
//   token.state = innerMode.state;

//   // If it's not a 'word-style' token, ignore the token.
//   if (!/^[\w$_]*$/.test(token.string)) {
//     token = {
//       start: cur.ch, end: cur.ch, string: "", state: token.state,
//       type: token.string == "." ? "property" : null
//     };
//   } else if (token.end > cur.ch) {
//     token.end = cur.ch;
//     token.string = token.string.slice(0, cur.ch - token.start);
//   }

//   var tprop = token;
//   // If it is a property, find out what it is a property of.
//   while (tprop.type == "property") {
//     tprop = getToken(editor, Pos(cur.line, tprop.start));
//     if (tprop.string != ".") return;
//     tprop = getToken(editor, Pos(cur.line, tprop.start));
//     if (!context) var context = [];
//     context.push(tprop);
//   }
//   return {
//     list: getCompletions(token, context, keywords, options),
//     from: Pos(cur.line, token.start),
//     to: Pos(cur.line, token.end)
//   };
// }

// function javascriptHint(editor, options) {
//   return scriptHint(editor, javascriptKeywords,
//     function (e, cur) { return e.getTokenAt(cur); },
//     options);
// };



// var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
//   "toUpperCase toLowerCase split concat match replace search").split(" ");
// var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
//   "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
// var funcProps = "prototype apply call bind".split(" ");
// var javascriptKeywords = ("break case catch class const continue debugger default delete do else export extends false finally for function " +
//   "if in import instanceof new null return super switch this throw true try typeof var void while with yield").split(" ");

// function forAllProps(obj, callback) {
//   if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
//     for (var name in obj) callback(name)
//   } else {
//     for (var o = obj; o; o = Object.getPrototypeOf(o))
//       Object.getOwnPropertyNames(o).forEach(callback)
//   }
// }

// function log(token, context, keywords, options) {
//   console.log('token:')
//   console.log(token);
//   console.log('options:')
//   console.log(options);
//   if (context) {
//     console.log('context:')
//     for (var i = 0; i < context.length; i++) {
//       console.log(context[i]);
//     }
//   }

// }

// function getCompletions(token, context, keywords, options) {
//   log(token, context, keywords, options);
//   var found = [], start = token.string, global = options && options.globalScope || window;
//   function maybeAdd(str) {
//     if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
//   }
//   function gatherCompletions(obj) {
//     if (typeof obj == "string") forEach(stringProps, maybeAdd);
//     else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
//     else if (obj instanceof Function) forEach(funcProps, maybeAdd);
//     forAllProps(obj, maybeAdd)
//   }

//   if (context && context.length) {
//     console.log('分支1:');
//     // If this is a property, see if it belongs to some object we can
//     // find in the current environment.
//     var obj = context.pop(), base;
//     console.log(obj);
//     if (obj.type && obj.type.indexOf("variable") === 0) {
//       if (options && options.additionalContext)
//         base = options.additionalContext[obj.string];
//       if (!options || options.useGlobalScope !== false)  // 找全局变量
//         base = base || global[obj.string];
//     } else if (obj.type == "string") {
//       base = "";
//     } else if (obj.type == "atom") {
//       base = 1;
//     } else if (obj.type == "function") {
//       if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
//         (typeof global.jQuery == 'function'))
//         base = global.jQuery();
//       else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
//         base = global._();
//     }
//     while (base != null && context.length)
//       base = base[context.pop().string];
//     if (base != null) gatherCompletions(base);
//   } else {
//     // If not, just look in the global object and any local scope
//     // (reading into JS mode internals to get at the local and global variables)
//     console.log('分支2:');
//     console.log('global:');
//     console.log(global);
//     for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
//     for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
//     if (!options || options.useGlobalScope !== false)
//       gatherCompletions(global);
//     forEach(keywords, maybeAdd);
//   }
//   return found;
// }


// CodeMirror.registerHelper("hint", "javascript", javascriptHint);