import {useCallback, useEffect} from "react";
import {fabric} from "fabric";

interface UseAuteResizeProps {
    canvas:fabric.Canvas | null
    container:HTMLDivElement | null

}
export const useAuteResize = ({
        canvas,
        container
    }:UseAuteResizeProps
) => {

    const autoZoom = useCallback(()=>{
        if (!canvas || !container) return

        const width = container.offsetWidth
        const height = container.offsetHeight

        // 设置画布尺寸与容器保持一致
        canvas.setWidth(width);
        canvas.setHeight(height);

        // 获取画布中心点坐标
        const center = canvas.getCenter()

        // 设置缩放比例因子
        const zoomRatio = 0.85;

        // 查找名为'clip'的工作区域对象
        const localWorkspace = canvas
            .getObjects()
            .find(obj=>obj.name==='clip')

        // 计算工作区域适应容器的最佳缩放比例 ， 基于工作区域原始大小
        // @ts-expect-error - findScaleToFit exists in runtime but missing in types
        const scale = fabric.util.findScaleToFit(
            localWorkspace,
            {
                width,
                height
            }
        )

        // 计算最终缩放值
        const zoom = zoomRatio * scale;

        // 重置视口变换矩阵并根据中心点进行缩放
        canvas.setViewportTransform(fabric.iMatrix.concat())

        // 获取当前视口变换矩阵
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);



        if (!localWorkspace) return;

        // 获取工作区域中心点
        const WorkspaceCenter = localWorkspace.getCenterPoint()
        const viewportTransform = canvas.viewportTransform

        if (canvas.width === undefined
            || canvas.height === undefined
            || !viewportTransform){
            return;
        }

        // 调整视口变换矩阵，使工作区域居中显示
        viewportTransform[4]  = canvas.width / 2 - WorkspaceCenter.x * viewportTransform[0];
        viewportTransform[5]  = canvas.height / 2 - WorkspaceCenter.y * viewportTransform[3];

        // 应用新的视口变换
        canvas.setViewportTransform(viewportTransform)

        // 克隆工作区域对象并设置为裁剪路径，然后重新渲染画布
        localWorkspace.clone((cloned : fabric.Rect)=>{
          canvas.clipPath = cloned
          canvas.requestRenderAll()
        })

    },[canvas,container])


    useEffect(()=>{
        // 声明ResizeObserver 观察期 ，用于监听元素大小变化
        let resizeObserver:ResizeObserver | null = null

        if(canvas && container){
            resizeObserver = new ResizeObserver(()=>{
                autoZoom()
            })
            resizeObserver.observe(container)
        }

        // 清理函数：组件卸载时停止观察
        return ()=>{
            if(resizeObserver){
                resizeObserver.disconnect()
            }
        }
    },[canvas,container,autoZoom])



}
