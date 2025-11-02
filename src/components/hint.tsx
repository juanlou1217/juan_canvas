import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// 工具提示触发ui
export interface HintProps {
    label: string; //  提示文本内容
    children: React.ReactNode; // 触发提示的子元素
    side?: "top" | "right" | "bottom" | "left"; // 提示框相对于触发元素的位置
    align?: "start" | "center" | "end"; // 提示框的对齐方式
    sideOffset?: number; // 提示框与触发元素之间的距离偏移量
    alignOffset?: number; // 提示框的水平对齐偏移量
}

export const Hint = ({
    label,
    children,
    side = "top",
    align = "center",
    sideOffset,
    alignOffset,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                <TooltipContent
                    className="text-white bg-slate-800 border-slate-800"
                    side={ side}
                    align={ align}
                    sideOffset={ sideOffset}
                    alignOffset={ alignOffset}
                >
                    <p className="font-semibold capitalize">
                        {label}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}