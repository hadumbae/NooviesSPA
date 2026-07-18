/**
 * @fileoverview Navigation link component styled as a card for use in control panels.
 */

import {ReactElement} from "react";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {cn} from "@/common/_feat";
import {LucideIcon} from "lucide-react";
import {LinkProps} from "react-router-dom";

/** Props for the PanelCardLink component. */
type StackedProps = Omit<LinkProps, "children"> & {
    icon: LucideIcon;
    text: string;
}

/**
 * A vertical card-style link containing a centered icon and text label.
 */
export function PanelCardLink(
    {className, icon: Icon, text, ...linkProps}: StackedProps
): ReactElement {
    const classes = cn(
        "link-button text-with-icon text-xs p-3 flex flex-col rounded-xl",
        "border dark:border-gray-100 hover:shadow-md dark:hover:shadow-gray-600",
        className
    );

    return (
        <LoggedLink {...linkProps} className={classes}>
            <Icon/>
            <span className="truncate w-full text-center">{text}</span>
        </LoggedLink>
    );
}
