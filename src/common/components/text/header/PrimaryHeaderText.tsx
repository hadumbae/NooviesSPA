/**
 * @file PrimaryHeaderText.tsx
 * @description
 * A reusable styled header component for consistent typography across the application.
 * Supports custom heading levels while applying a shared header style.
 *
 * This component is intended for use anywhere a page or section header is needed.
 * It ensures consistent styling via `HeaderTextCSS` while allowing semantic flexibility
 * through the `as` prop (h1–h6).
 *
 * @example
 * ```tsx
 * <PrimaryHeaderText>Dashboard</PrimaryHeaderText>
 *
 * <PrimaryHeaderText as="h2" className="mt-4">
 *   Recent Activity
 * </PrimaryHeaderText>
 * ```
 */

import {FC, ReactNode} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {HeaderTextCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * @typedef TextProps
 * @description Props for the `PrimaryHeaderText` component.
 *
 * @property {ReactNode} children
 * The text or elements to render inside the header.
 *
 * @property {string} [className]
 * Additional CSS classes to apply to the header.
 *
 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} [as='h1']
 * The semantic heading level to render. Defaults to `h1`.
 */
type TextProps = {
    children: ReactNode;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

/**
 * @component PrimaryHeaderText
 * @description
 * A typographically consistent header component that renders a semantic heading
 * element (`h1`–`h6`) with shared header styling.
 *
 * Useful for pages, sections, and any context requiring a styled header with
 * proper semantic structure.
 *
 * @param {TextProps} props — Component props.
 * @returns {JSX.Element} A styled heading element.
 */
const PrimaryHeaderText: FC<TextProps> = ({children, className, as: Tag = 'h1'}) => {
    return (
        <Tag className={cn(HeaderTextCSS, className)}>
            {children}
        </Tag>
    );
};

export default PrimaryHeaderText;
