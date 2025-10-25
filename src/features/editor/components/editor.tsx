"use client";

import {useEditor} from "@/features/editor/hooks/use-editor";
import {useEffect, useRef} from "react";
import { fabric } from 'fabric'


export const Editor = () => {


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
    }, [init])


  return (
      <div className="h-full flex ">
          <div className='flex-1 h-full bg-muted' ref={containerRef}>
              <canvas ref={canvasRef}/>
          </div>
      </div>

  )
}