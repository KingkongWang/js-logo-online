const Sample1 =
    '/* jshint esversion:6   */\n' + 
    '/** \n' +
    ' * 正多边形示例\n' +
    ' */\n' +
    'function draw(edgeNum, edgeLen, sleepMS) {\n' +
    '    let angle = 360 / edgeNum;\n' + 
    '    app.turtle.show();\n' + 
    '    for(let i = 0; i < edgeNum; i++){\n' +
    '        app.turtle.forward(edgeLen);\n' +
    '        app.turtle.right(angle);\n' +
    '        app.system.sleep(sleepMS);\n' +
    '    }\n' +
    '}\n' +
    'let edgeNum = 6;\n' +
    'let edgeLen = 100;\n' +
    'draw(edgeNum, edgeLen, 30);\n';

/**
 * 
 */
const Sample2 =
    '/* jshint esversion:6   */\n' + 
    '/** \n' +
    ' * 填充正多边形示例\n' +
    ' */\n' +
    'function draw(edgeNum, edgeLen, sleepMS) {\n' +
    '    let angle = 360 / edgeNum;\n' + 
    '    app.turtle.show();\n' + 
    '    for(let i = 0; i < edgeNum; i++){\n' +
    '        app.turtle.forward(edgeLen);\n' +
    '        app.turtle.right(angle);\n' +
    '        app.system.sleep(sleepMS);\n' +
    '    }\n' +
    '}\n' +
    'let edgeNum = 6;\n' +
    'let edgeLen = 100;\n' +
    'app.pen.setColor("#FF0000");\n' + 
    'app.turtle.fillPath(() => {\n' + 
    '    draw(edgeNum, edgeLen, 30);\n' + 
    '});\n';
    



const Samples = [
     {label:"正多边形", code:Sample1},
     {label:"填充正多边形", code:Sample2},
];


const TurtleCommands = [
    {label:"显示", code:"app.turtle.show();"},
    {label:"隐藏", code:"app.turtle.hide();"},
    {label:"前进", code:"app.turtle.forward(0);"},
    {label:"后退", code:"app.turtle.backward(0);"},
    {label:"向右转", code:"app.turtle.right(0);"},
    {label:"向左转", code:"app.turtle.left(0);"},
    {label:"回家", code:"app.turtle.home();"},
    {label:"设置位置", code:"app.turtle.position(100,100);"},
    // {label:"填充模式", code:
    //     "app.turtle.beginFill();\n" +
    //     "//添加海龟移动代码\n" +
    //     "app.turtle.endFill();\n"
    // },
    {label:"填充路径", code:
    "app.turtle.fillPath(() => {\n" +
    "//添加海龟移动代码\n" +
    "});\n"
    },

    // {label:"圆", code:"app.turtle.drawCircle(100);"},
    // {label:"填充圆", code:"app.turtle.fillCircle(100);"},
    // {label:"矩形", code:"app.turtle.drawRect(100, 100);"},
    // {label:"填充矩形", code:"app.turtle.fillRect(100, 100);"},

];

const PenCommands = [
    {label:"抬笔", code:"app.pen.up();"},
    {label:"落笔", code:"app.pen.down();"},
    {label:"颜色", code:"app.pen.setColor('#000000');"},
    {label:"粗细", code:"app.pen.setSize(1);"},
];

const TextCommands = [
    {label:"绘制文本", code:"app.text.drawText('hello,world!');"},
    {label:"设置字体", code:"app.text.font('18px SimHei');"},
];

const SystemCommands = [
    {label:"暂停", code:"app.system.sleep(30);"},
    {label:"清屏", code:"app.system.clear();"},
    {label:"背景色", code:"app.system.setColor('#ffffff');"}
];





const SampleMenuLabel = "示例";
const SystemMenuLabel = "系统指令";
const TurtleMenuLabel = "海龟指令";
const PenMenuLabel = "画笔指令";
const TextMenuLabel = "文本指令"

export default {
    
    SampleMenuLabel:SampleMenuLabel,
    SystemMenuLabel:SystemMenuLabel,
    TurtleMenuLabel:TurtleMenuLabel,
    PenMenuLabel:PenMenuLabel,
    TextMenuLabel:TextMenuLabel,
    
    Samples:Samples,
    SystemCommands:SystemCommands,
    TurtleCommands:TurtleCommands,
    PenCommands:PenCommands,
    TextCommands:TextCommands,

}