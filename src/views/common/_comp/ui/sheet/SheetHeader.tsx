import * as React from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";

export const SheetHeader = (
    {className, ...props}: React.HTMLAttributes<HTMLDivElement>
) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
SheetHeader.displayName = "SheetHeader"