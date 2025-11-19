import {FC, ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";

type HeaderProps = {
    /** Content to be displayed inside the section header. */
    children: ReactNode;

    /** Optional additional class names to apply to the header element. */
    className?: string;

    /**
     * If true, visually hides the header while keeping it accessible to screen readers.
     * If false, the header is visible and will still be read by screen readers as a normal `<h1>`.
     */
    srOnly?: boolean;
}

/**
 * Simple header component for use inside sections.
 *
 * Renders an `<h1>` element with default styling for section headers
 * (`text-lg` and `font-bold`). Accepts additional classes via `className`.
 *
 * Accessibility:
 * - When `srOnly` is true, the header is visually hidden but remains in the accessibility tree.
 * - When `srOnly` is false, the header is visible and screen readers will read it automatically.
 *
 * @example
 * ```tsx
 * <SectionHeader>Personal Details</SectionHeader>
 * <SectionHeader className="text-xl text-primary">Movie Credits</SectionHeader>
 * <SectionHeader srOnly>Hidden Section Label</SectionHeader>
 * ```
 */
const SectionHeader: FC<HeaderProps> = ({children, className, srOnly = false}) => {
    return (
        <h1 className={cn(
            "text-lg font-bold",
            "dark:text-white",
            srOnly && "sr-only",
            className,
        )}>
            {children}
        </h1>
    );
};

export default SectionHeader;
