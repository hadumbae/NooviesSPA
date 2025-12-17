import {FC, ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {SubheaderTextCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for {@link SecondaryHeaderText}.
 */
type TextProps = {
    /**
     * Content to be rendered inside the header element.
     */
    children: ReactNode;

    /**
     * Optional additional CSS classes.
     */
    className?: string;

    /**
     * HTML heading level to render.
     *
     * Defaults to `"h1"`.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

/**
 * @file SecondaryHeaderText.tsx
 *
 * Reusable secondary header text component.
 *
 * Renders semantic heading elements with a shared subheader
 * typography style, while allowing the heading level to be
 * selected via the `as` prop.
 *
 * @example
 * ```tsx
 * <SecondaryHeaderText as="h2">
 *   Upcoming Showings
 * </SecondaryHeaderText>
 * ```
 */
const SecondaryHeaderText: FC<TextProps> = ({children, className, as: Tag = 'h1'}) => {
    return (
        <Tag className={cn(SubheaderTextCSS, className)}>
            {children}
        </Tag>
    );
};

export default SecondaryHeaderText;
