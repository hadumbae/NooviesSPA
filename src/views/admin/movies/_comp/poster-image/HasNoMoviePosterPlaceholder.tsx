/** @fileoverview Fallback placeholder component for movie entities that do not have a poster image. */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {ImageOff} from "lucide-react";

/** Props for the HasNoMoviePosterPlaceholder component. */
type PlaceholderProps = {
    className?: string;
};

/** Renders a styled grey box with a film icon to indicate the absence of a movie poster. */
export function HasNoMoviePosterPlaceholder(
    {className}: PlaceholderProps
): ReactElement {
    return (
        <div className={cn(
            "aspect-[2/3] flex justify-center items-center bg-gray-600",
            className
        )}>
            <ImageOff className="text-gray-400"/>
        </div>
    );
}