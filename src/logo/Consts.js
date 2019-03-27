const Sample1 =
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
const Sample2 =
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
    {label:"显示", code:"app.turtle.show();"},
    {label:"隐藏", code:"app.turtle.hide();"},
    {label:"前进", code:"app.turtle.forward(0);"},
    {label:"后退", code:"app.turtle.backward(0);"},
    {label:"向右转", code:"app.turtle.right(0);"},
    {label:"向左转", code:"app.turtle.left(0);"},
    {label:"回家", code:"app.turtle.home();"},
    {label:"圆", code:"app.turtle.circle(100);"},
    {label:"填充圆", code:"app.turtle.fillCircle(100, '#ff0000');"},
    {label:"矩形", code:"app.turtle.rect(100, 100);"},
    {label:"填充矩形", code:"app.turtle.fillRect(100, 100, '#ff0000');"},

];

export const PenCommands = [
    {label:"抬笔", code:"app.pen.up();"},
    {label:"落笔", code:"app.pen.down();"},
    {label:"颜色", code:"app.pen.setColor('#ffffff');"},
    {label:"粗细", code:"app.pen.setSize(1);"},
];

export const TextCommands = [
    {label:"绘制文本", code:"app.text.draw('hello,world!', 100, 100);"},
    {label:"设置字体", code:"app.text.font('18px SimHei');"},
];