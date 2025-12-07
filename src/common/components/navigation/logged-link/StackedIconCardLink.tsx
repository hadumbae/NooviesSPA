/**
 * @file StackedIconCardLink
 * @description
 * A vertically stacked icon-and-text link component that wraps a {@link LoggedLink}.
 *
 * This component renders a `LoggedLink` with:
 * - A top icon (from `LucideIcon`).
 * - A text label underneath the icon.
 * - Customizable styling via `className` and default icon-text card CSS.
 *
 * The component supports forwarding refs to the underlying anchor element.
 */

import { forwardRef } from "react";
import LoggedLink, { LoggedLinkProps } from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import { cn } from "@/common/lib/utils.ts";
import { IconTextButtonCSS } from "@/common/constants/css/ButtonCSS.ts";
import { LucideIcon } from "lucide-react";

/**
 * Props for {@link StackedIconCardLink}.
 *
 * @property icon The icon to render above the text (from `lucide-react`).
 * @property text The text label to render below the icon.
 * @inheritdoc LoggedLinkProps
 */
type StackedProps = Omit<LoggedLinkProps, "children"> & {
    icon: LucideIcon;
    text: string;
}

/**
 * A vertically stacked icon-and-text link component.
 *
 * Wraps {@link LoggedLink} and applies card-like styles, showing an icon
 * above a text label. Supports ref forwarding to the anchor element.
 *
 * @param props Stacked icon link props.
 * @param ref Forwarded ref to the underlying anchor element.
 *
 * @example
 * ```tsx
 * <StackedIconCardLink
 *   href="/dashboard"
 *   icon={HomeIcon}
 *   text="Dashboard"
 * />
 * ```
 *
 * @returns A styled `LoggedLink` element with stacked icon and text.
 */
const StackedIconCardLink = forwardRef<HTMLAnchorElement, StackedProps>((props, ref) => {
    const { className, icon: Icon, text, ...linkProps } = props;

    const classes = cn(
        IconTextButtonCSS,
        "text-xs p-3 flex flex-col rounded-xl",
        "border dark:border-gray-100 hover:shadow-md dark:hover:shadow-gray-600",
        className
    );

    return (
        <LoggedLink ref={ref} {...linkProps} className={classes}>
            <Icon />
            <span className="truncate w-full text-center">{text}</span>
        </LoggedLink>
    );
});

export default StackedIconCardLink;
