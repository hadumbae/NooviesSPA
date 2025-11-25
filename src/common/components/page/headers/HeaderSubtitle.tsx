import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HeaderSubtitle} component.
 */
type SubtitleProps = {
    /**
     * Optional additional CSS class names to apply to the subtitle.
     * Can be used to adjust spacing, color, or layout.
     */
    className?: string;
};

/**
 * Renders a subtitle or secondary heading with consistent typographic styling.
 *
 * Designed to complement {@link HeaderTitle} by providing descriptive or contextual
 * text beneath a main header.
 *
 * This component uses a lighter, italicized font style and adjusts its size
 * responsively:
 * - `text-sm` on small screens
 * - `text-base` on medium screens
 * - `text-lg` on extra-large screens
 *
 * @example
 * ```tsx
 * <HeaderSubtitle className="text-neutral-500">
 *   Directed by Christopher Nolan
 * </HeaderSubtitle>
 * ```
 *
 * @param children - The subtitle text or elements to display.
 * @param className - Optional additional CSS classes.
 */
const HeaderSubtitle: FC<PropsWithChildren<SubtitleProps>> = ({children, className}) => {
    return (
        <h2 className={cn(
            SecondaryTextBaseCSS,
            "text-sm font-light italic",
            "md:text-base",
            "xl:text-lg",
            className,
        )}>
            {children}
        </h2>
    );
};

export default HeaderSubtitle;
