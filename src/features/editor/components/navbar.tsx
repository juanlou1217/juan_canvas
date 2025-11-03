'use client'


import { Logo } from "@/features/editor/components/logo";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import {ChevronDown, Download, MousePointerClick, Redo2, Undo2} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import {Separator} from "@/components/ui/separator";
import {Hint} from "@/components/hint";
import {BsCloudCheck} from "react-icons/bs";
import {ActiveTool} from "@/features/editor/types";
import {cn} from "@/lib/utils";


export interface NavbarProps {
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
}


export const Navbar = ( {activeTool, onChangeActiveTool}: NavbarProps) => {

    return (
        <nav className={'w-full flex  items-center  p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'}>
                <Logo />

                {/*工作栏*/}
                <div className="w-full flex items-center gap-x-1 h-full">
                    {/*文件操作*/}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger>
                            <Button size="sm" variant="ghost">
                                File
                                <ChevronDown className="size-4 ml-2"/>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start" className="min-w-60">
                            <DropdownMenuItem
                                className="flex items-center gap-x-2"
                                onClick={() => {
                                    // TODO : open file
                                    console.log("open file")
                                }}
                            >
                                <CiFileOn className="size-8" />
                                <div>
                                    <p>Open</p>
                                    <p className="text-xs text-muted-foreground ">open a JSON file</p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Separator orientation="vertical" className="mx-2"/>


                    {/*操作区*/}
                    <Hint label="Select" side="bottom" sideOffset={10} >
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => { onChangeActiveTool("select")}}
                            className= {cn(activeTool === "select" &&  "bg-gray-100")}
                        >
                            <MousePointerClick className="size-4"/>
                        </Button>
                    </Hint>

                    <Hint label="撤销" side="bottom" sideOffset={10} >
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                // TODO : save file
                                console.log("save file")
                            }}
                            className=""  // TODO : add 动态类
                        >
                            <Undo2 className="size-4"/>
                        </Button>
                    </Hint>

                    <Hint label="重做" side="bottom" sideOffset={10} >
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                                // TODO : save file
                                console.log("save file")
                            }}
                            className=""  // TODO : add 动态类
                        >
                            <Redo2 className="size-4"/>
                        </Button>
                    </Hint>
                    <Separator orientation="vertical" className="mx-2"/>

                    {/*  状态 */}
                    <div className="flex items-center gap-x-2">
                        {/* TODO   多种保存状态 */}
                        <BsCloudCheck className="size-[20px] text-muted-foreground"/>
                        <div className="text-muted-foreground text-xs">
                            Saved
                        </div>

                    </div>



                    {/*导出*/}
                    <div className="flex items-center gap-x-4 ml-auto">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                    Export
                                    <Download className="size-4 ml-4"/>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="min-w-60">
                                <DropdownMenuItem
                                    className="flex items-center gap-x-2"
                                    onClick={() => {
                                        // TODO : open file
                                        console.log("save file")
                                    }}
                                >
                                    <CiFileOn className="size-8" />
                                    <div>
                                        <p>JSON</p>
                                        <p className="text-xs text-muted-foreground ">save for later editing </p>
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="flex items-center gap-x-2"
                                    onClick={() => {
                                        // TODO : open file
                                        console.log("save file")
                                    }}
                                >
                                    <CiFileOn className="size-8" />
                                    <div>
                                        <p>PNG</p>
                                        <p className="text-xs text-muted-foreground ">Best for sharing on the web</p>
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="flex items-center gap-x-2"
                                    onClick={() => {
                                        // TODO : open file
                                        console.log("save file")
                                    }}
                                >
                                    <CiFileOn className="size-8" />
                                    <div>
                                        <p>JPG</p>
                                        <p className="text-xs text-muted-foreground ">Best for social media and printing</p>
                                    </div>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="flex items-center gap-x-2"
                                    onClick={() => {
                                        // TODO : open file
                                        console.log("save file")
                                    }}
                                >
                                    <CiFileOn className="size-8" />
                                    <div>
                                        <p>SVG</p>
                                        <p className="text-xs text-muted-foreground ">Best for editing in vector software</p>
                                    </div>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* TODO : 用户登录*/}

                </div>
        </nav>
    )
}