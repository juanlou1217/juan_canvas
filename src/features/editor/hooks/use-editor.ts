import {useCallback, useMemo, useState} from "react";
import {fabric} from 'fabric'
import {useAuteResize} from "@/features/editor/hooks/useAuteResize";
import {
    BuildEditorProps,
    CIRCLE_OPTIONS,
    DIAMIOND_OPTIONS,
    Editor, EditorHookProps, FILL_COLOR,
    RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_DASH_ARRAP, STROKE_width,
    TRIANFLE_OPTIONS
} from "@/features/editor/types";
import {useCanvasEvents} from "@/features/editor/hooks/use-canvas-events";
import {isTextType} from "@/features/editor/utils";


const buildEditor = ({
      canvas,
      fillColor,
      strokeColor,
      strokeWidth,
      strokeDashArray,
      setFillColor,
      setStrokeColor,
      setStrokeWidth,
      setStrokeDashArray,
      selectedObjects
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

        // 透明度
        changeOpacity:(opacity:number)=>{
            canvas.getActiveObjects().forEach(obj=>{
                obj.set({   opacity:opacity   })
            })
            canvas.renderAll()
        },



        // 层级操作
        bringForward: () => {
            canvas.getActiveObjects().forEach(obj => {
                canvas.bringForward(obj);
            });
            canvas.renderAll();
            const  workspace = getWorkspace()
            workspace?.sendBackwards()
        },

        sendBackward: () => {
            canvas.getActiveObjects().forEach(obj => {
                canvas.sendBackwards(obj);
            });
            canvas.renderAll();
            const  workspace = getWorkspace()
            workspace?.sendBackwards()
        },


        // 创建对象
        addCircle:()=>{
            const obj = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
            })
            addToCanvas(obj)
        },

        addSoftRectangle:()=>{
            const obj = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
                rx:50,
                ry:50,
            })
            addToCanvas(obj)
        },

        addRectangle:()=>{
            const obj = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
            })
            addToCanvas(obj)
        },

        addTriangle:()=>{
            const obj = new fabric.Triangle({
                ...TRIANFLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
            })
            addToCanvas(obj)
        },

        addInverseTriangle:()=>{
            const obj = new fabric.Triangle({
                ...TRIANFLE_OPTIONS,
                fill:fillColor,
                stroke:strokeColor,
                strokeWidth:strokeWidth,
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
                    fill:fillColor,
                    stroke:strokeColor,
                    strokeWidth:strokeWidth,
                })
            addToCanvas(obj)
        },


        // 修改属性
        changeFillColor:(color: string)=>{
            setFillColor(color)
            canvas.getActiveObjects().forEach(obj=>{  // 批量修改选中对象属性
                obj.set({   fill:color   })
            })
            canvas.renderAll()
        },

        changeStrokeColor:(color: string)=>{
            setStrokeColor(color)
            canvas.getActiveObjects().forEach(obj=>{
                if (isTextType(typeof obj.type === "string" ? obj.type : "")){
                    obj.set({   fill:color  })
                    return;
                }
                obj.set({stroke:color})
            })
            canvas.renderAll()
        },

        changeStrokeWidth:(width: number)=>{
            setStrokeWidth(width)
            canvas.getActiveObjects().forEach(obj=>{  // 批量修改选中对象属性
                obj.set({   strokeWidth:width   })
            })
            canvas.renderAll()
        },

        changeStrokeDashArray:(type: number[])=>{
            setStrokeDashArray(type)
            canvas.getActiveObjects().forEach(obj=>{
                obj.set({   strokeDashArray:type   })
            })
            canvas.renderAll()
        },


        // 获取属性
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects,

        // 获取当前选中对象属性
        getActiveFillColor: ()=>{
            const activeObject = selectedObjects[0]
            if (!activeObject){
                return fillColor
            }
            const value = activeObject.get("fill") || fillColor
            return value as string
        },

        getActiveStrokeColor: ()=>{
            const activeObject = selectedObjects[0]
            if (!activeObject){
                return strokeColor
            }
            const value = activeObject.get("stroke") || strokeColor
            return value as string
        },

        getActiveStrokeWidth: ()=>{
            const activeObject = selectedObjects[0]
            if (!activeObject){
                return strokeWidth
            }
            const value = activeObject.get("strokeWidth") || strokeWidth
            return value as number
        },

        getStrokeDashArray: ()=>{
            const slectedObject = selectedObjects[0]
            if (!slectedObject){
                return strokeDashArray
            }
            const value = slectedObject.get("strokeDashArray") || strokeDashArray
            return value as number[]
        },

        getActionOpacity:()=>{
            const slectedObject = selectedObjects[0]
            if (!slectedObject){
                return 1
            }
            const value = slectedObject.get("opacity") || 1
            return value as number
        },

    }
}


export const useEditor = ({
    clearSelectionCallback
}:EditorHookProps) => {

    const [ canvas,setCanvas ] = useState<fabric.Canvas | null>(null)
    const [ container,setContainer ] = useState<HTMLDivElement | null>(null)
    const [ selectedObjects , setSelectedObjects ] = useState<fabric.Object[]>([])

    const [fillColor,setFillColor] = useState(FILL_COLOR)
    const [strokeColor,setStrokeColor] = useState(STROKE_COLOR)
    const [strokeWidth,setStrokeWidth] = useState(STROKE_width)
    const [strokeDashArray,setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAP)


    useAuteResize({canvas,container  })

    useCanvasEvents({
        canvas,
        setSelectedObjects,
        clearSelectionCallback
    })

    const editor = useMemo(()=>{
        if (canvas) return buildEditor({
            canvas,
            fillColor,
            strokeColor,
            strokeWidth,
            strokeDashArray,
            setFillColor,
            setStrokeColor,
            setStrokeWidth,
            setStrokeDashArray,
            selectedObjects
        })
        return undefined
    },[canvas, fillColor, strokeColor, strokeWidth, strokeDashArray, selectedObjects])

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
