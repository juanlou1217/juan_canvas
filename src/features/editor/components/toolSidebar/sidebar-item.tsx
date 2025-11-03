import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

export const SidebarItem = ({
                              icon: Icon,
                              label,
                              isActive,
                              onClick,
                            }: SidebarItemProps) => {
  return (
      <Button
          variant="ghost"
          onClick={onClick}
          className={cn(
              "w-full h-auto p-3 py-4 flex flex-col rounded-none",  // 移除 h-full 和 aspect-video
              isActive && "bg-muted text-primary"
          )}
      >
        <Icon className="size-5 stroke-2 shrink-0" />
        <span className="mt-2 text-xs">
        {label}
      </span>
      </Button>
  );
};
