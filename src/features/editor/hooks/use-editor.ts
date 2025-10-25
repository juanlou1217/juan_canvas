import {useCallback, useState} from "react";
import { fabric } from 'fabric'
import {useAuteResize} from "@/features/editor/hooks/useAuteResize";

export const useEditor = () => {

    const [ canvas,setCanvas ] = useState<fabric.Canvas | null>(null)
    const [ container,setContainer ] = useState<HTMLDivElement | null>(null)

    useAuteResize({canvas,container})

    const init = useCallback(
        ({
             initiaCanvas,
             initiaContainer
        }:{
            initiaCanvas:fabric.Canvas,
            initiaContainer:HTMLDivElement
    }) =>{

            // 设置 fabric 对象的全局默认样式属性
            fabric.Object.prototype.set({
                cornerColor: '#FFF',           // 控制手柄填充颜色为白色
                cornerStyle: 'circle',         // 控制手柄形状为圆形
                borderColor: '#3b82f6',        // 选中对象时的边框颜色为蓝色
                borderScaleFactor: 1.5,        // 边框粗细缩放因子
                transparentCorners: false,     // 控制手柄是否透明（false表示不透明）
                borderOpacityWhenMoving: 1,    // 对象移动时边框的不透明度
                cornerStrokeColor: '#3b82f6',  // 控制手柄描边颜色为蓝色
            })


            // 设置初始工作区
            const initialWorkArea = new fabric.Rect({
                width: 900,
                height: 1200,
                name:'clip',
                fill: 'white',
                selectable:false,   // 禁用选择功能，用户无法选中这个矩形
                hasControls:false, // 隐藏控制控件（如缩放、旋转手柄等）
                shadow : new fabric.Shadow({
                    color: 'rgba(0,0,0,0.8)',
                    blur: 5
                })
            });

            initiaCanvas.add(initialWorkArea);
            initiaCanvas.centerObject(initialWorkArea)
            initiaCanvas.clipPath = initialWorkArea;        // 只显示画布中 initialWorkArea 区域内的内容

            setCanvas(initiaCanvas)
            setContainer(initiaContainer)





            const test = new fabric.Rect({
                width: 100,
                height: 100,
                fill: 'black',
            })
            initiaCanvas.add(test)
            initiaCanvas.centerObject(test)

    },[])

  return {init}

}
