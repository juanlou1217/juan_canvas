import {RGBColor} from "react-color";

// 判断颜色对象是否为文本类型
export function isTextType(type : string){
    return type === "text"  || type === "textbox" || type === "i-text"
}




// 将 RGBA 颜色对象转换为 CSS
export function rgbObjectToString(rgb:RGBColor | "transparent"){
    if (rgb === "transparent"){
        return `rgba(0,0,0,0)`
    }

    const alpha = rgb.a  === undefined ? 1 : rgb.a;
    return `rgba( ${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}