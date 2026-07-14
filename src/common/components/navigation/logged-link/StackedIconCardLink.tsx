/**
 * @fileoverview Navigation link component that displays an icon and text in a stacked card format.
 */

import {forwardRef} from "react";
import LoggedLink, {LoggedLinkProps} from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {LucideIcon} from "lucide-react";

type StackedProps = Omit<LoggedLinkProps, "children"> & {
    icon: LucideIcon;
    text: string;
}

/** A navigation link that displays a Lucide icon above a text label within a card-styled container. */
export const StackedIconCardLink = forwardRef<HTMLAnchorElement, StackedProps>((props, ref) => {
    const {className, icon: Icon, text, ...linkProps} = props;

    const classes = cn(
        "link-button text-with-icon text-xs p-3 flex flex-col rounded-xl",
        "border dark:border-gray-100 hover:shadow-md dark:hover:shadow-gray-600",
        className
    );

    return (
        <LoggedLink ref={ref} {...linkProps} className={classes}>
            <Icon/>
            <span className="truncate w-full text-center">{text}</span>
        </LoggedLink>
    );
});
