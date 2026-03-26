/**
 * @file Reusable Page/Section heading component with standardized typography.
 * @filename HeaderTitle.tsx
 */

import {ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the {@link HeaderTitle} component.
 */
type TitleProps = {
    /** The content of the header, typically a title string or element. */
    children: ReactNode;

    /** * Optional additional CSS classes for layout or color overrides.
     * @example "text-center" or "mb-4"
     */
    className?: string;
}

/**
 * Renders a semantic `h1` header with responsive scaling and project-standard styling.
 */
const HeaderTitle = ({children, className}: TitleProps) => {
    return (
        <h1 className={cn(
            PrimaryTextBaseCSS,
            "font-bold text-base md:text-lg 2xl:text-xl",
            className,
        )}>
            {children}
        </h1>
    );
};

export default HeaderTitle;