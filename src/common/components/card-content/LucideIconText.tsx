/**
 * @fileoverview A reusable component for displaying Lucide icons alongside text labels.
 */

import { ReactElement } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/common/lib/utils.ts";

/** Props for the LucideIconText component. */
export type IconTextProps = {
    icon: LucideIcon;
    text: string;
    size?: string | number | undefined;
    iconCSS?: string;
    textCSS?: string;
    className?: string;
};

/** Renders a Lucide icon next to a text label with customizable styling and sizing. */
export function LucideIconText(
    { text, icon: Icon, size = 15, className, iconCSS, textCSS }: IconTextProps
): ReactElement {
    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <Icon size={size} className={cn(iconCSS)} />
            <span className={cn("select-none", textCSS)}>{text}</span>
        </div>
    );
}
