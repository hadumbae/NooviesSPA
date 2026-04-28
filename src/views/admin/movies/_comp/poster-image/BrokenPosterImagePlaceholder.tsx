/** @fileoverview Fallback placeholder component for failed or missing movie poster images. */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {CircleSlash} from "lucide-react";

/** Props for the BrokenPosterImagePlaceholder component. */
type ErrorPlaceholderProps = {
    className?: string;
};

/** Renders a styled gray box with an icon to represent a broken or unavailable poster image. */
export function BrokenPosterImagePlaceholder(
    {className}: ErrorPlaceholderProps
): ReactElement {
    return (
        <div className={cn(
            "bg-gray-600 aspect-[2/3] rounded-md",
            "flex items-center justify-center",
            className
        )}>
            <CircleSlash className="text-gray-400"/>
        </div>
    );
}