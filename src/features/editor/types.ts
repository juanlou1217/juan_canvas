import {fabric} from "fabric";




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

export const FILL_COLOR = "rgba(0,0,0,1)"
export const STROKE_COLOR = "rgba(0,0,0,1)"
export const STROKE_width = 2


export type BuildEditorProps = {
    canvas: fabric.Canvas;

}

export interface Editor {
    addCircle:()=>void;
    addSoftRectangle:()=>void;
    addRectangle:()=>void;
    addTriangle:()=>void;
    addInverseTriangle:()=>void;
    addDiamond:()=>void;
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

