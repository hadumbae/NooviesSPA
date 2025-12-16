/**
 * @file DetailsCardSpan.tsx
 * @description
 * A reusable component for displaying a labeled detail in a card or panel.
 *
 * Features:
 * - Displays a label (uppercased, small text) and a main text/value.
 * - Supports rendering the main text as a link if a `to` URL is provided.
 * - Allows custom HTML element types via the `as` prop.
 * - Accepts additional CSS classes for styling both label and text.
 *
 * @example
 * ```tsx
 * <DetailsCardSpan
 *   label="Theatre Name"
 *   text="Grand Cinema"
 * />
 *
 * <DetailsCardSpan
 *   label="Website"
 *   text="Visit"
 *   to="https://example.com"
 * />
 *
 * <DetailsCardSpan
 *   as="p"
 *   label="Capacity"
 *   text={150}
 * />
 * ```
 */

import {ElementType} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {LoggerFunction} from "@/common/utility/features/logger/Logger.types.ts";

/**
 * Props for `DetailsCardSpan`.
 */
type SpanProps = {
    /**
     * The element type to render when `to` is not provided.
     * Defaults to `"span"` if not specified.
     */
    as?: ElementType;

    /**
     * Additional CSS classes to apply to the main text element.
     */
    className?: string;

    /**
     * The label for the detail (displayed above the text).
     */
    label: string;

    /**
     * The text or number to display as the main content.
     */
    text: string | number;

    /**
     * Optional URL to render the text as a clickable link.
     * Opens in a new tab.
     */
    to?: string | null;

    sourceComponent?: string;

    navMessage?: string;
}

/**
 * Component to display a labeled detail with optional link support.
 *
 * @param props - Props controlling label, text, link, and styling.
 * @returns JSX element rendering a labeled detail with optional link.
 */
const DetailsCardSpan = (props: SpanProps) => {
    // --- Props ---
    const {as: Component = "span", label, text, to, className, sourceComponent, navMessage} = props

    // --- Content ---
    const linkProps = {
        level: "log" as LoggerFunction,
        component: sourceComponent,
        message: navMessage,
        target: "_blank",
    }

    const content = (to ? (
            <LoggedLink className={cn("font-bold hover:underline", className)} to={to}  {...linkProps}>
                {text}
            </LoggedLink>
        ) : (
            <Component className={cn("font-bold", className)}>
                {text}
            </Component>
        )
    );

    // --- Render ---
    return (
        <div className="flex flex-col space-y-0">
            <span className={cn(SecondaryTextBaseCSS, "text-[12px] uppercase")}>{label}</span>

            <div className={PrimaryTextBaseCSS}>
                {content}
            </div>
        </div>
    );
};

export default DetailsCardSpan;
