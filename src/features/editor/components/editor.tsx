"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import { fabric } from 'fabric'

import {useEditor} from "@/features/editor/hooks/use-editor";
import { Navbar } from "@/features/editor/components/navbar";
import {Sidebar} from "@/features/editor/components//sidebar";
import {Toolbar} from "@/features/editor/components/toolbar";
import {Footer} from "@/features/editor/components/footer";
import {ActiveTool} from "@/features/editor/types";
import {ShapeSideber} from "@/features/editor/components/toolSidebar/shape-sideber";


export const Editor = () => {
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

    const {init} = useEditor();
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
                  activeTool={activeTool}
                  onChangeActiveTool={onChangeActiveTool}
              />

              <main className="bg-muted flex-1 overflow-auto relative flex flex-col">
                  <Toolbar/>

                  <div className='flex-1 h-[calc(100%-124px)] bg-muted' ref={containerRef}>
                      <canvas ref={canvasRef}/>
                  </div>

                  <Footer/>
              </main>
          </div>
      </div>

  )
}