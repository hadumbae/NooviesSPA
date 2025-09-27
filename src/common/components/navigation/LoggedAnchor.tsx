import {AnchorHTMLAttributes, FC, ReactNode} from 'react';
import {LoggerFunction} from "@/common/utility/logger/Logger.types.ts";
import {useLocation} from "react-router-dom";
import buildStandardLog from "@/common/utility/logger/buildStandardLog.ts";
import buildContext from "@/common/utility/logger/buildLoggerContext.ts";

/**
 * Props for the {@link LoggedAnchor} component.
 *
 * Extends standard HTML anchor attributes with logging capabilities.
 */
export type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    /** Content to be rendered inside the anchor. */
    children: ReactNode;

    /** Destination URL for the anchor. Required for navigation and logging. */
    href: string;

    /** Logging level (e.g., "log", "info", "warn", "error"). */
    level?: LoggerFunction;

    /** Optional component name for logging context. */
    component?: string;

    /** Optional custom message to include in the log. */
    message?: string;
};

/**
 * Represents the structured context logged by {@link LoggedAnchor}.
 */
export type LoggedAnchorContext = {
    /** Optional custom message provided via props. */
    message?: string;
    /** Target href the user is navigating to. Guaranteed to exist. */
    to: string;
    /** Full current location (`pathname + search + hash`) from which navigation occurs. */
    from: string;
    /** Anchor's `target` attribute, e.g., `_blank`, `_self`. */
    target?: string;
};

/**
 * A logging-aware `<a>` anchor component.
 *
 * @remarks
 * - Logs every click using `buildStandardLog` with a structured {@link LoggedAnchorContext}.
 * - Captures the link `href`, `target`, current location, and optional message.
 * - Supports all standard anchor attributes via `AnchorHTMLAttributes`.
 *
 * @example
 * ```tsx
 * <LoggerAnchor
 *   href="/dashboard"
 *   target="_blank"
 *   level="info"
 *   component="SidebarMenu"
 *   message="User clicked dashboard link"
 * >
 *   Dashboard
 * </LoggerAnchor>
 * ```
 */
const LoggedAnchor: FC<AnchorProps> = (props) => {
    const {children, message, component, level, ...anchorProps} = props;
    const {href, target} = anchorProps;

    const {pathname, search, hash} = useLocation();
    const from = `${pathname}${search}${hash}`;

    /**
     * Handles anchor clicks and logs navigation details.
     *
     * @remarks
     * - Builds a structured context (`LoggerAnchorContext`) including:
     *   - `message` – optional message from props
     *   - `to` – target href
     *   - `from` – current location
     *   - `target` – anchor's target attribute
     * - Sends the log entry using `buildStandardLog`.
     */
    const onClick = () => {
        const context = buildContext([
            {key: "message", value: message},
            {key: "to", value: href},
            {key: "from", value: from},
            {key: "target", value: target},
        ]);

        buildStandardLog({
            level,
            type: "NAVIGATION",
            msg: "Anchor Navigation",
            component,
            context,
        });
    }

    return (
        <a {...anchorProps} onClick={onClick}>
            {children}
        </a>
    );
};

export default LoggedAnchor;
