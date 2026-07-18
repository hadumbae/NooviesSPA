/**
 * @fileoverview A reusable animated loading spinner component.
 */

import {Loader, LucideIcon} from "lucide-react";
import {cn} from "@/common/_feat";
import {ReactElement} from "react";

/** Props for the AnimatedLoader component. */
type LoaderType = {
    icon?: LucideIcon
    className?: string;
}

/**
 * Renders an animated spinning icon used for loading states.
 */
export function AnimatedLoader(
    {icon: Icon = Loader, className}: LoaderType
): ReactElement {
    return (
        <Icon className={cn("animate-spin", className)}/>
    );
}
