/**
 * @file Animated icon loader component.
 * AnimatedLoader.tsx
 */

import {Loader, LucideIcon} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";

/** Props for AnimatedLoader. */
type LoaderType = {
    /** Icon to render as the loader. */
    icon?: LucideIcon
    /** Additional class names for styling. */
    className?: string;
}

/** Renders a spinning icon loader. */
const AnimatedLoader = (
    {icon: Icon = Loader, className}: LoaderType
) => {
    return (
        <Icon className={cn("animate-spin", className)} />
    );
};

export default AnimatedLoader;