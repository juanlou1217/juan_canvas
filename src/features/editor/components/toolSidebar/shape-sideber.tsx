"use client"

import {ActiveTool, Editor} from "@/features/editor/types";
import {cn} from "@/lib/utils";
import {ToolSidebarHeader} from "@/features/editor/components/toolSidebar/tool-sidebar-header";
import {ToolSidebarClose} from "@/features/editor/components/toolSidebar/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {SidebarTool} from "@/features/editor/components/toolSidebar/shape-tool";
import {FaCircle, FaSquare, FaSquareFull,} from "react-icons/fa";
import {IoTriangle} from "react-icons/io5";
import {FaDiamond} from "react-icons/fa6";

export interface ShapeSideberProps {
    activeTool: ActiveTool;
    editor: Editor | undefined ;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSideber = ({activeTool, editor , onChangeActiveTool}: ShapeSideberProps) => {
    const onClose = () => {
        onChangeActiveTool("select");
    }


    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "shapes" ? "visible" : "hidden"
            )}>
            <ToolSidebarHeader
                title={"Shapes"}
                description={"Create shapes with different shapes"}
            />
            <ScrollArea>
                <div className={"p-4 gap-4 grid grid-cols-3 "}>
                    <SidebarTool
                        icon={FaCircle}
                        onClick={() => editor?.addCircle()}
                    />

                    <SidebarTool
                        icon={FaSquare}
                        iconClassName=""
                        onClick={() => editor?.addSoftRectangle()}
                    />

                    <SidebarTool
                        icon={FaSquareFull}
                        iconClassName=""
                        onClick={() => editor?.addRectangle()}
                    />

                    <SidebarTool
                        icon={IoTriangle}
                        iconClassName=""
                        onClick={() => editor?.addTriangle()}
                    />

                    <SidebarTool
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                        onClick={() => editor?.addInverseTriangle()}
                    />

                    <SidebarTool
                        icon={FaDiamond}
                        iconClassName=""
                        onClick={() => editor?.addDiamond()}
                    />



                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose}/>

        </aside>
    )
}
