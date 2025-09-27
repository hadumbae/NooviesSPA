import {FC, PropsWithChildren} from 'react';
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {To} from "react-router-dom";
import ButtonVariant from "@/common/type/ui/ButtonVariant.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

/**
 * Props for the {@link HeaderLink} component.
 */
interface Props {
    /**
     * Destination path or location object for navigation.
     * Passed directly to {@link LoggedLink}.
     */
    to: To;

    /**
     * Optional message to include in logging when the link is clicked.
     * Useful for analytics or debug tracking.
     */
    message?: string;

    /**
     * Button style variant.
     *
     * @remarks
     * Passed to `buttonVariants` to determine visual style.
     * Defaults to `"outline"`.
     */
    variant?: ButtonVariant;

    /**
     * Additional CSS classes to apply to the link.
     *
     * @remarks
     * Combined with button variant classes for full styling.
     */
    className?: string;

    /**
     * Optional component name to include in logs for context.
     */
    component?: string;
}

/**
 * A header-styled navigation link that combines {@link LoggedLink} with button styles.
 *
 * @remarks
 * - Wraps the children with a styled button-like anchor.
 * - Automatically applies `buttonVariants` and hover/focus styles.
 * - Logs navigation clicks via `LoggedLink` with optional `message` and `component`.
 *
 * @example
 * ```tsx
 * <HeaderLink
 *   to="/dashboard"
 *   variant="solid"
 *   message="User clicked dashboard link"
 *   component="HeaderMenu"
 * >
 *   Dashboard
 * </HeaderLink>
 * ```
 */
const HeaderLink: FC<PropsWithChildren<Props>> = (props) => {
    const {children, to, message, component, variant = "outline", className = ""} = props

    return (
        <LoggedLink
            to={to}
            component={component}
            message={message}
            className={cn(
                buttonVariants({variant}),
                "text-neutral-400 hover:text-black p-2",
                className
            )}
        >
            {children}
        </LoggedLink>
    );
};

export default HeaderLink;
