import { FC, PropsWithChildren } from 'react';
import { cn } from "@/common/lib/utils.ts";

/**
 * Props for the `HeaderDescription` component.
 */
type DescriptionProps = {
    /** Optional additional class names to apply to the paragraph element. */
    className?: string;
};

/**
 * A paragraph component intended for displaying descriptive text in headers.
 *
 * @remarks
 * - Applies default styling for neutral-colored, small, justified text.
 * - Supports responsive font sizing (`text-xs` on small screens, `text-sm` on medium screens and above).
 * - Accepts additional `className` prop for further customization.
 *
 * @example
 * ```tsx
 * <HeaderDescription className="mt-2">
 *   This is a description under the header.
 * </HeaderDescription>
 * ```
 *
 * @param props.children - The content of the description paragraph.
 * @param props.className - Optional additional CSS classes.
 */
const HeaderDescription: FC<PropsWithChildren<DescriptionProps>> = ({ children, className }) => {
    return (
        <p
            className={cn(
                "text-justify",
                "text-neutral-500 dark:text-neutral-300",
                "text-xs md:text-sm",
                className,
            )}
        >
            {children}
        </p>
    );
};

export default HeaderDescription;
