export const Sample1 =
    '/* jshint esversion:6   */\n' + 
    '/** \n' +
    ' * 六边形示例\n' +
    ' */\n' +
    'let times = 6;\n' +
    'let len = 100;\n' + 
    'let angle = 60;\n' + 
    'app.turtle.show();\n' + 
    'for(let i = 0; i < times; i++){\n' +
    '    app.turtle.forward(len);\n' +
    '    app.turtle.right(angle);\n' +
    '}';

/**
 * 
 */
export const Sample2 =
    '/* jshint esversion: 6 */\n' + 
    '/**\n' +
    ' * 五角星示例\n' +
    ' */\n' +
    'let times = 5;\n' +
    'let len = 100;\n' + 
    'let angle = 60;\n' + 
    'app.turtle.show();\n' +
    'for(let i = 0; i < times; i++){\n' +
    '    app.turtle.forward(100);\n' +
    '    app.turtle.right(30);\n' +
    '}';



export const Samples = [
     {label:"六边形", code:Sample1},
     {label:"五角星", code:Sample2},
];

export const ScreenCommands = [
    {label:"清屏", code:"app.screen.clear();"},
    {label:"设置背景色", code:"app.screen.setColor('#ffffff');"}
];


export const TurtleCommands = [
    {label:"清屏", code:"app.screen.clear();"},
    {label:"设置背景色", code:"app.screen.setColor('#ffffff');"}
];

export const PenCommands = [
    {label:"抬笔", code:"app.pen.up();"},
    {label:"落笔", code:"app.pen.down();"}
];
