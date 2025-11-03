"use client"

import {ActiveTool} from "@/features/editor/types";
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
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSideber = ({activeTool, onChangeActiveTool}: ShapeSideberProps) => {
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
                        iconClassName=""
                        onClick={() => {}}
                    />

                    <SidebarTool
                        icon={FaSquare}
                        iconClassName=""
                        onClick={() => {}}
                    />

                    <SidebarTool
                        icon={FaSquareFull}
                        iconClassName=""
                        onClick={() => {}}
                    />

                    <SidebarTool
                        icon={IoTriangle}
                        iconClassName=""
                        onClick={() => {}}
                    />

                    <SidebarTool
                        icon={IoTriangle}
                        iconClassName="rotate-180"
                        onClick={() => {}}
                    />

                    <SidebarTool
                        icon={FaDiamond}
                        iconClassName=""
                        onClick={() => {}}
                    />



                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={onClose}/>

        </aside>
    )
}
