import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {cn} from "@/common/lib/utils.ts";

export const SheetTitle = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({className, ...props}, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-neutral-950 dark:text-neutral-50", className)}
        {...props}
    />
))

SheetTitle.displayName = SheetPrimitive.Title.displayName