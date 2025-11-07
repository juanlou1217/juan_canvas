import {useCallback, useMemo, useState} from "react";
import {fabric} from 'fabric'
import {useAuteResize} from "@/features/editor/hooks/useAuteResize";
import {
    BuildEditorProps,
    CIRCLE_OPTIONS,
    DIAMIOND_OPTIONS,
    Editor,
    RECTANGLE_OPTIONS,
    TRIANFLE_OPTIONS
} from "@/features/editor/types";


const buildEditor = ({
                         canvas,
                     }:BuildEditorProps) : Editor=> {

    const getWorkspace = ()=>{
        return canvas.
        getObjects().
        find(obj => obj.name === 'clip')
    }

    const center =(obj:fabric.Object)=>{
        const  workspace = getWorkspace()
        const center = workspace?.getCenterPoint()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        canvas._centerObject(obj,center)

        // canvas.centerObject(object)
    }

    const addToCanvas = ((obj:fabric.Object)=>{
        center(obj)
        canvas.add(obj)
        canvas.setActiveObject(obj)
    })

    return {
        addCircle:()=>{
            const obj = new fabric.Circle({
                ...CIRCLE_OPTIONS
            })
            addToCanvas(obj)
        },

        addSoftRectangle:()=>{
            const obj = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx:50,
                ry:50,
            })
            addToCanvas(obj)
        },

        addRectangle:()=>{
            const obj = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
            })
            addToCanvas(obj)
        },

        addTriangle:()=>{
            const obj = new fabric.Triangle({
                ...TRIANFLE_OPTIONS,
            })
            addToCanvas(obj)
        },

        addInverseTriangle:()=>{
            const obj = new fabric.Triangle({
                ...TRIANFLE_OPTIONS,
                angle:180
            })
            addToCanvas(obj)
        },
        addDiamond:()=>{
            const HEIGHT = DIAMIOND_OPTIONS.height;
            const WIDTH = DIAMIOND_OPTIONS.width;
            const obj = new fabric.Polygon(
                [
                    {x: WIDTH / 2, y: 0},
                    {x: WIDTH, y: HEIGHT / 2},
                    {x: WIDTH / 2, y: HEIGHT},
                    {x: 0, y: HEIGHT/2},
                ], {
                    ...DIAMIOND_OPTIONS,
                })
            addToCanvas(obj)
        },




    }
}


export const useEditor = () => {

    const [ canvas,setCanvas ] = useState<fabric.Canvas | null>(null)
    const [ container,setContainer ] = useState<HTMLDivElement | null>(null)

    useAuteResize({canvas,container})

    const editor = useMemo(()=>{
        if (canvas) return buildEditor({
            canvas,
        })
        return undefined
    },[canvas])

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

        },[])

    return {init  , editor}

}
