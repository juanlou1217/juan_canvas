"use client"

import {ChevronsLeft} from "lucide-react";

interface ToolSidebarCloseProps {
    onClick: () => void;
}

export const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
    return (
        <div className="absolute -right-[1.80rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r border-y transition">
            <button
                className=""
                onClick={onClick}
            >
                <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition"/>
            </button>
        </div>
    )
}