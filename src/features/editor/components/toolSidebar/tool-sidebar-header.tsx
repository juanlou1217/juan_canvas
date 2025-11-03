"use client"

export interface ToolbarHeaderProps {
    title: string;
    description: string;
}

export const ToolSidebarHeader = ({ title, description }: ToolbarHeaderProps) => {
    return (
        <div className="p-4 border-b scroll-py-1 h-[68px]">
            <p className="text-sm font-semibold">{title}</p>
            {description &&
                <p className="text-xs text-muted-foreground ">{description}</p>
            }
        </div>
    )
}

