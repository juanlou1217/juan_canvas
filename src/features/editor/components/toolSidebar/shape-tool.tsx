"use client"

import type {LucideIcon} from "lucide-react";
import type {IconType} from "react-icons";

import {cn} from "@/lib/utils";

interface  SidebarToolProps {
    icon: IconType | LucideIcon;
    iconClassName?: string;
    onClick: () => void;
}

export const SidebarTool = ({icon: Icon, iconClassName, onClick}: SidebarToolProps) => {
    return (
        <button
            className = "aspect-square border rounded-md p-5"
            onClick={onClick}
        >
            <Icon className={cn("h-full w-full" , iconClassName )} />
        </button>
    )
}
