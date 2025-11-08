import {fabric} from "fabric";
import * as materral from 'material-colors';

export const colors = [
    materral.red[500],
    materral.pink[500],
    materral.purple[500],
    materral.deepPurple[500],
    materral.indigo[500],
    materral.blue[500],
    materral.cyan[500],
    materral.lightBlue[500],
    materral.green[500],
    materral.lightGreen[500],
    materral.lime[500],
    materral.yellow[500],
    materral.amber[500],
    materral.orange[500],
    materral.deepOrange[500],
    materral.brown[500],
    materral.grey[500],
    materral.blueGrey[500],
    "transparent",
]



/**
 * 活动工具类型定义
 * 定义了编辑器中可用的各种工具类型
 */
export type ActiveTool =
    | "select"          // 选择工具
    | "shapes"          // 形状工具
    | "text"            // 文本工具
    | "images"          // 图像工具
    | "draw"            // 绘制工具
    | "fill"            // 填充工具
    | "stroke-color"    // 描边颜色工具
    | "stroke-width"    // 描边宽度工具
    | "font"            // 字体工具
    | "opacity"         // 透明度工具
    | "filter"          // 滤镜工具
    | "settings"        // 设置工具
    | "ai"              // AI工具
    | "remove-bg"       // 背景移除工具
    | "templates";      // 模板工具


export const selectionDependentTools = [
    "fill",
    'font',
    'filter',
    'opacity',
    'remove-bg',
    'stroke-color',
    'stroke-width',
]


export const FILL_COLOR = "rgba(0,0,0,1)"
export const STROKE_COLOR = "rgba(0,0,0,1)"
export const STROKE_width = 2
export const STROKE_DASH_ARRAP = []


export interface EditorHookProps {
    clearSelectionCallback ?: () => void ;
}


export type BuildEditorProps = {
    canvas: fabric.Canvas;
    fillColor: string;
    strokeColor: string;
    strokeWidth: number;
    strokeDashArray: number[];
    setFillColor: (color: string) => void;
    setStrokeColor: (color: string) => void;
    setStrokeWidth: (width: number) => void;
    setStrokeDashArray : (type: number[]) => void

    selectedObjects: fabric.Object[]
}


export interface Editor {

    changeOpacity:(opacity:number)=>void;


    bringForward : ()=>void,
    sendBackward : ()=>void,


    addCircle:()=>void;
    addSoftRectangle:()=>void;
    addRectangle:()=>void;
    addTriangle:()=>void;
    addInverseTriangle:()=>void;
    addDiamond:()=>void;

    changeFillColor:(color:string)=>void;
    changeStrokeColor:(color:string)=>void;
    changeStrokeWidth:(width:number)=>void
    changeStrokeDashArray:(type: number[]) => void

    canvas: fabric.Canvas;
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,

    getActiveFillColor:()  => string,
    getActiveStrokeColor:()  => string,
    getActiveStrokeWidth:()  => number,
    getStrokeDashArray:()  => number[],
    getActionOpacity:()=>number;


    selectedObjects: fabric.Object[]
}


export const CIRCLE_OPTIONS = {
    radius:150,
    left:100,
    top:100,
    fill:FILL_COLOR,
    stroke : STROKE_COLOR,
    strokeWidth:STROKE_width,
}

export const RECTANGLE_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_width,
}

export const TRIANFLE_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_width,
}

export const DIAMIOND_OPTIONS = {
    width: 400,
    height: 400,
    angle: 0,
    left: 100,
    top: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_width,
}

