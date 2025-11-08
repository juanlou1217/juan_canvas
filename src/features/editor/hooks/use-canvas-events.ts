import {fabric} from "fabric";
import {useEffect} from "react";


export interface UseAuteResizeProps {
    canvas:fabric.Canvas | null
    setSelectedObjects: (obj :fabric.Object[] ) => void
    clearSelectionCallback?: ()=>void
}

export const useCanvasEvents = ({
      canvas,
      setSelectedObjects,
      clearSelectionCallback
}:UseAuteResizeProps) => {
    useEffect(()=>{
        if (canvas){
            canvas.on("selection:created", (e) => {     // 创建选区
                setSelectedObjects(e.selected || [] )
            })

            canvas.on("selection:updated", (e) => {     // 更换扩展选区
                setSelectedObjects(e.selected || [] )
            })

            canvas.on("selection:cleared", () => {     // 清空选区
                setSelectedObjects([])
                clearSelectionCallback?.()
            })
        }
        return ()=>{
            if ( canvas){
            canvas.off("selection:created")
            canvas.off("selection:updated")
            canvas.off("selection:cleared")
        }}



    },[canvas, clearSelectionCallback, setSelectedObjects])
}