import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";

/**
 * Props for the {@link HeaderTitle} component.
 */
type TitleProps = {
    /**
     * Additional CSS class names to apply to the header.
     * Useful for customizing spacing, color, or layout.
     */
    className?: string;
}

/**
 * Renders a page or section header with consistent typography styling.
 *
 * This component automatically scales its font size across breakpoints:
 * - `text-xl` on small screens
 * - `text-2xl` on medium screens
 * - `text-4xl` on extra-large screens
 *
 * You can pass additional styles through the `className` prop.
 *
 * @example
 * ```tsx
 * <HeaderTitle className="text-center text-primary">
 *   Movie Details
 * </HeaderTitle>
 * ```
 *
 * @param children - The content of the header, typically a title string or element.
 * @param className - Optional additional CSS classes.
 */
const HeaderTitle: FC<PropsWithChildren<TitleProps>> = ({children, className}) => {
    return (
        <h1 className={cn(
            "text-xl font-bold",
            "md:text-2xl",
            "xl:text-4xl",
            className,
        )}>
            {children}
        </h1>
    );
};

export default HeaderTitle;
