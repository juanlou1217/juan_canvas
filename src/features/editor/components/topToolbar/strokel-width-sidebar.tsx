"use client"

import {ActiveTool, Editor, STROKE_DASH_ARRAP, STROKE_width} from "@/features/editor/types";
import {cn} from "@/lib/utils";
import {ToolSidebarClose} from "@/features/editor/components/toolSidebar/tool-sidebar-close";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ToolSidebarHeader} from "@/features/editor/components/toolSidebar/tool-sidebar-header";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";


export interface StrokelWidthSidebarProps {
    activeTool: ActiveTool;
    editor: Editor | undefined ;
    onChangeActiveTool: (tool: ActiveTool) => void;
}

export const StrokelWidthSidebar = ({
                                     activeTool,
                                     editor ,
                                     onChangeActiveTool
                                 }: StrokelWidthSidebarProps) => {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_width ;
    const typeValue = editor?.getStrokeDashArray() || STROKE_DASH_ARRAP ;

    const onClose = () => {
        onChangeActiveTool("select");
    }

    const onChangeStrokWidth = (value: number)=> {
        editor?.changeStrokeWidth(value)
    }

    const onChangeStrokType = (value: number[])=> {
        editor?.changeStrokeDashArray(value)
    }

    return (
        <aside className={cn(
            "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
            activeTool === "stroke-width" ? "visible" : "hidden"
        )}>
            <ToolSidebarHeader
                title={"Strokel options"}
                description={"Add Strokel width your element"}
            />

            <ScrollArea>
                <div className="p-4 space-y-4 border-b ">
                    <Label className="text-sm ">
                        Strokel width
                    </Label>
                    <Slider
                        value={[widthValue]}
                        className=""
                        onValueChange={(value) => onChangeStrokWidth(value[0])}
                    />
                </div>


                <div className="p-4 space-y-4 border-b ">
                    <Label className="text-sm ">
                        Strokel type
                    </Label>
                        <Button
                            size={"lg"}
                            variant={"secondary"}
                            className={cn(
                                "w-full h-16 justify-start text-left",
                                typeValue.length === 0 && "border-blue-500 border "
                            )}
                            style={ {padding:"8px  16px"}}
                            onClick={()=> onChangeStrokType([])}
                        >
                             <div
                                 className="w-full border-black rounded-full border-4"
                             />
                        </Button>


                        <Button
                            size={"lg"}
                            variant={"secondary"}
                            className={cn(
                                "w-full h-16 justify-start text-left",
                                JSON.stringify(typeValue) === "[5,5]" && "border-blue-500 border-2 "
                            )}
                            style={ {padding:"8px  16px"}}
                            onClick={()=> onChangeStrokType([5,5])}

                        >
                            <div
                                className="w-full border-black rounded-full border-4 border-dashed"
                            />
                        </Button>




                </div>
            </ScrollArea>


            <ToolSidebarClose onClick={onClose}/>

        </aside>
    )
}

