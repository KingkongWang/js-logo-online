export const Sample1 =
    '/* jshint esversion:6   */\n' + 
    '/** \n' +
    ' * 示例1\n' +
    ' */\n' +
    'let times = 6;\n' +
    'app.turtle.show();\n' + 
    'for(let i = 0; i < times; i++){\n' +
    '    app.turtle.forward(100);\n' +
    '    app.turtle.right(60);\n' +
    '}';

/**
 * 
 */
export const Sample2 =
    '/* jshint esversion: 5 */\n' + 
    '/** \n' +
    ' * 示例2\n' +
    ' */\n' +
    'var times = 6;\n' +
    'app.turtle.hide();\n' +
    'for(var i = 0; i < times; i++){\n' +
    '    app.turtle.forward(100);\n' +
    '    app.turtle.right(60);\n' +
    '}';



export const Samples = [
     {id:0, code:Sample1 , desc:"六边形"},
     {id:1, code:Sample2, desc:"隐藏海龟"},
]