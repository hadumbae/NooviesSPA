/**
 * @file LinkGroup.tsx
 * @description
 * Renders a group of navigation links separated by an icon, with optional logging support.
 */

import {Dot, LucideIcon} from "lucide-react";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {ReactElement} from "react";
import {LinkConfig} from "@/common/type/components/LinkConfig.ts";

/**
 * Props for {@link LinkGroup}.
 */
type GroupProps = {
    /**
     * Optional class name applied to each rendered link.
     */
    className?: string;

    /**
     * List of link configurations to render.
     */
    links: LinkConfig[];

    /**
     * Optional icon used as a separator between links.
     * Defaults to {@link Dot}.
     */
    separator?: LucideIcon;
};

/**
 * Renders a sequence of {@link LoggedHoverLink} components separated by an icon.
 *
 * @example
 * ```tsx
 * <LinkGroup
 *   links={[
 *     {to: "/home", label: "Home"},
 *     {to: "/about", label: "About"}
 *   ]}
 * />
 * ```
 */
const LinkGroup = (props: GroupProps) => {
    const {links, className, separator: Icon = Dot} = props;

    const separatedLinks: ReactElement[] = links.reduce((acc, cur, i) => {
        const {to, context, message} = cur;

        const props = {
            to,
            context,
            message,
            className
        };

        const link = (
            <LoggedHoverLink {...props}>
                {cur.label}
            </LoggedHoverLink>
        );

        if (i === 0) return [link];
        return [...acc, <Icon size={15} />, link];
    }, [] as ReactElement[]);

    return <div className="flex items-center">
        {separatedLinks}
    </div>;
};

export default LinkGroup;
