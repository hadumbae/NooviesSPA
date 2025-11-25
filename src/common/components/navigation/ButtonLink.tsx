/**
 * @file ButtonLink.tsx
 * @description
 * A styled link component that behaves like a button and supports logging.
 *
 * Combines:
 * - `LoggedLink` for logging and navigation tracking.
 * - `buttonVariants` from the UI library for consistent button styling.
 *
 * Supports specifying `variant` and `size` to match other UI buttons.
 *
 * Designed to be used in a `react-router-dom` `<Router>` context.
 *
 * @example
 * ```tsx
 * <ButtonLink to="/dashboard" variant="default" size="sm">
 *   Go to Dashboard
 * </ButtonLink>
 * ```
 */

import { forwardRef } from "react";
import { cn } from "@/common/lib/utils.ts";
import { buttonVariants } from "@/common/components/ui/button.tsx";
import ButtonVariant from "@/common/type/ui/shad-cn-button/ButtonVariant.ts";
import ButtonSize from "@/common/type/ui/shad-cn-button/ButtonSize.ts";
import LoggedLink, { LoggedLinkProps } from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for `ButtonLink` component.
 *
 * Extends `LoggedLinkProps` with optional button styling options.
 *
 * @property variant - Button style variant (default: `"link"`).
 * @property size - Button size (default: `"default"`).
 */
type ButtonProps = LoggedLinkProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

/**
 * `ButtonLink` renders a `LoggedLink` with button-like styling.
 *
 * - Applies the selected `variant` and `size` via `buttonVariants`.
 * - Preserves all logging/navigation functionality from `LoggedLink`.
 *
 * @param props - Props extending `ButtonProps`.
 * @param ref - Optional `ref` forwarded to the underlying anchor element.
 *
 * @returns A styled, logging-enabled link that looks like a button.
 *
 * @example
 * ```tsx
 * <ButtonLink to="/profile" variant="default" size="lg" component="Header">
 *   Profile
 * </ButtonLink>
 * ```
 */
const ButtonLink = forwardRef<HTMLAnchorElement, ButtonProps>((props, ref) => {
    const { className, variant = "link", size = "default", ...rem } = props;

    return (
        <LoggedLink
            ref={ref}
            {...rem}
            className={cn(
                buttonVariants({ variant, size }),
                className
            )}
        />
    );
});

export default ButtonLink;
