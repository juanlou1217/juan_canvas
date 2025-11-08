"use client"

import {ActiveTool, Editor} from "@/features/editor/types";
import {cn} from "@/lib/utils";
import {ToolSidebarClose} from "@/features/editor/components/toolSidebar/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ToolSidebarHeader} from "@/features/editor/components/toolSidebar/tool-sidebar-header";
import {Slider} from "@/components/ui/slider";
import {useEffect, useMemo, useState} from "react";


export interface OpacitySidebarProps {
    activeTool: ActiveTool;
    editor: Editor | undefined ;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
                                     activeTool,
                                     editor ,
                                     onChangeActiveTool
                                 }: OpacitySidebarProps) => {
    const value = editor?.getActionOpacity() || 1 ;
    const selectedObject = useMemo(()=>
            editor?.selectedObjects[0],
        [editor?.selectedObjects])

    const [opacity, setOpacity] = useState(value)

    const onClose = () => {
        onChangeActiveTool("select");
    }

    useEffect(() => {
        if (selectedObject){
            setOpacity(selectedObject.get('opacity') || 1)
        }
    }, [selectedObject])

    const onChange = (value: number)=> {
        editor?.changeOpacity(value)
        setOpacity(value)
    }


    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "opacity" ? "visible" : "hidden"
        )}>
            <ToolSidebarHeader
                title={"Opacity"}
                description={"Change the opacity of the selecte object "}
            />
            <ScrollArea>
                <div className="p-4 space-y-4 border-b ">
                    <Slider
                        value={[opacity]}
                        className=""
                        onValueChange={(value) => onChange(value[0])}
                        max={1}
                        min={0}
                        step={0.01}
                    />
                </div>

            </ScrollArea>


            <ToolSidebarClose onClick={onClose}/>

        </aside>
    )
}

