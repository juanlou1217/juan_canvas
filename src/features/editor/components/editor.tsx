"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import { fabric } from 'fabric'

import {useEditor} from "@/features/editor/hooks/use-editor";
import { Navbar } from "@/features/editor/components/navbar";
import {Sidebar} from "@/features/editor/components//sidebar";
import {Toolbar} from "@/features/editor/components/toolbar";
import {Footer} from "@/features/editor/components/footer";
import {ActiveTool, selectionDependentTools} from "@/features/editor/types";
import {ShapeSideber} from "@/features/editor/components/toolSidebar/shape-sideber";
import {FillColorSidebar} from "@/features/editor/components/topToolbar/fill-color-sidebar";
import {StrokelColorSidebar} from "@/features/editor/components/topToolbar/strokel-color-sidebar";
import {StrokelWidthSidebar} from "@/features/editor/components/topToolbar/strokel-width-sidebar";
import {OpacitySidebar} from "@/features/editor/components/topToolbar/opacity-sidebar";


export const Editor = () => {

    // 工具栏状态管理
    const [activeTool, setActiveTool] = useState<ActiveTool>("select");
    const  onChangeActiveTool  = useCallback((tool: ActiveTool)=>{
        if (tool !== activeTool){
            setActiveTool("select");
        }
        if(tool === "draw"){
            // TODO : 开启绘画
        }

        if (activeTool === "draw"){
            // TODO :关闭绘画

        }
        setActiveTool(tool);
    }, [activeTool])

    const onClearSelection = useCallback(()=>{
    if (selectionDependentTools.includes(activeTool)){
        setActiveTool("select")
    }
    }, [activeTool])


    const {init , editor } = useEditor({
        clearSelectionCallback: onClearSelection
    });
    const canvasRef = useRef(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const canvas = new fabric.Canvas(
            canvasRef.current,
            {
                controlsAboveOverlay: true, // 确保对象的控制控件
                preserveObjectStacking: true    // 持画布上对象的堆叠顺序
            });

        init({
            initiaCanvas: canvas,
            initiaContainer: containerRef.current!,

        });

        return () => {
            canvas.dispose();
        }

    }, [init])


  return (
      <div className="h-full flex flex-col">
          <Navbar
              activeTool={activeTool}
              onChangeActiveTool={onChangeActiveTool}
          />

          <div className='absolute h-[calc(100%-68px)] w-full top-[68px] flex'>

              <Sidebar
                activeTool={activeTool}
                onChangeActiveTool={onChangeActiveTool}
              />


              <ShapeSideber
                  editor={editor}
                  activeTool={activeTool}
                  onChangeActiveTool={onChangeActiveTool}
              />


              <FillColorSidebar
                  editor={editor}
                  activeTool={ activeTool }
                  onChangeActiveTool={onChangeActiveTool}
              />
              <StrokelColorSidebar
                  editor={editor}
                  activeTool={ activeTool }
                  onChangeActiveTool={onChangeActiveTool}
              />
              <StrokelWidthSidebar
                  editor={editor}
                  activeTool={ activeTool }
                  onChangeActiveTool={onChangeActiveTool}
              />
              <OpacitySidebar
                  editor={editor}
                  activeTool={ activeTool }
                  onChangeActiveTool={onChangeActiveTool}
              />


              <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                  <Toolbar
                      editor={editor}
                      activeTool={activeTool}
                      onChangeActiveTool={onChangeActiveTool}
                      key = {JSON.stringify(editor?.canvas.getActiveObjects())}
                  />

                  <div className='flex-1 h-[calc(100%-124px)] bg-muted' ref={containerRef}>
                      <canvas ref={canvasRef}/>
                  </div>

                  <Footer/>
              </main>
          </div>
      </div>

  )
}