/**
 * @fileoverview A placeholder component for missing or failed images.
 */

import {ReactElement} from "react";
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {ImageOff, LucideIcon} from "lucide-react";

/** Props for the NoImagePlaceholder component. */
type PlaceholderProps = {
    icon?: LucideIcon
    hasError?: boolean;
    errorText?: string;
    className?: string;
};

/**
 * Renders a fallback UI with an icon and optional error message when an image cannot be displayed.
 */
export function NoImagePlaceholder(
    {icon: Icon = ImageOff, className, hasError, errorText}: PlaceholderProps
): ReactElement {
    return (
        <div className={cn("flex-centre flex-col bg-gray-600", className)}>
            <Icon className="text-gray-400"/>

            {hasError && (
                <span className="primary-text italic text-sm">
                    {errorText ?? "Failed To Fetch Image"}
                </span>
            )}
        </div>
    );
}