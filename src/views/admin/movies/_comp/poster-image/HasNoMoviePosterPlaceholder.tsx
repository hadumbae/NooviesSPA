/** @fileoverview Fallback placeholder component for movie entities that do not have a poster image. */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat";
import {ImageOff} from "lucide-react";

/** Props for the HasNoMoviePosterPlaceholder component. */
type PlaceholderProps = {
    className?: string;
    hasError?: boolean;
};

/** Renders a styled grey box with a film icon to indicate the absence of a movie poster. */
export function HasNoMoviePosterPlaceholder(
    {className, hasError}: PlaceholderProps
): ReactElement {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center bg-gray-600 rounded-md",
            className
        )}>
            <ImageOff className="text-gray-400"/>

            {
                hasError && (
                    <span className="primary-text italic text-sm">
                        Failed To Fetch Image
                    </span>
                )
            }
        </div>
    );
}