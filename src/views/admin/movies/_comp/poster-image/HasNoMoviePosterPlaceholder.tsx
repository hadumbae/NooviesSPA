/** @fileoverview Fallback placeholder component for movie entities that do not have a poster image. */

import {ReactElement} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {Film} from "lucide-react";

/** Props for the HasNoMoviePosterPlaceholder component. */
type PlaceholderProps = {
    className?: string;
};

/** Renders a styled gray box with a film icon to indicate the absence of a movie poster. */
export function HasNoMoviePosterPlaceholder({className}: PlaceholderProps): ReactElement {
    return (
        <div className={cn(
            "bg-gray-600 aspect-[2/3] rounded-md",
            "flex items-center justify-center",
            className
        )}>
            <Film className="text-gray-400"/>
        </div>
    );
}