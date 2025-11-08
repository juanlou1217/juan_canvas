"use client"

import {ActiveTool, Editor, STROKE_COLOR} from "@/features/editor/types";
import {cn} from "@/lib/utils";
import {ToolSidebarHeader} from "@/features/editor/components/toolSidebar/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/toolSidebar/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ColorPicker} from "@/features/editor/components/topToolbar/color-picker";


export interface StrokelColorSidebarProps {
    activeTool: ActiveTool;
    editor: Editor | undefined ;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokelColorSidebar = ({
                                     activeTool,
                                     editor ,
                                     onChangeActiveTool
                                 }: StrokelColorSidebarProps) => {
    const value = editor?.getActiveStrokeColor() || STROKE_COLOR ;

    const onClose = () => {
        onChangeActiveTool("select");
    }


    const onChange = (value: string)=> {
        editor?.changeStrokeColor(value)
    }


    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "stroke-color" ? "visible" : "hidden"
        )}>
            <ToolSidebarHeader
                title={"Strokel color"}
                description={"Add Strokel color your element"}
            />

            <ScrollArea>
                <div className={"p-4 scroll-py-6 "}>
                    <ColorPicker
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </ScrollArea>


            <ToolSidebarClose onClick={onClose}/>

        </aside>
    )
}
