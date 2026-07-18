/**
 * @fileoverview A component that renders a list of navigation links separated by a visual icon.
 */

import {Dot, LucideIcon} from "lucide-react";
import {HoverLink} from "@/views/common/_feat/navigation/HoverLink.tsx";
import {ReactElement} from "react";
import {LinkItemConfig} from "@/common/_types/navigation/LinkItemConfig.ts";
import {NoneSpan} from "@/views/common/_comp/text-display/spans/NoneSpan.tsx";

/** Props for the SeparatedLinks component. */
type LinkProps = {
    className?: string;
    links: LinkItemConfig[];
    separator?: LucideIcon;
};

/**
 * Renders a horizontal list of links with a customisable separator icon between each item.
 */
export function SeparatedLinks(props: LinkProps): ReactElement {
    const {links, className, separator: Icon = Dot} = props;

    if (links.length === 0) {
        return <NoneSpan/>;
    }

    const separatedLinks: ReactElement[] = links.reduce((acc, cur, i) => {
        const {to, context, message} = cur;
        const props = {to, context, message, className};
        const link = (<HoverLink key={`link-${i}`} {...props}>{cur.label}</HoverLink>);

        if (i === 0) {
            return [link];
        }

        return [...acc, <Icon key={`icon-${i}`} size={15}/>, link];
    }, [] as ReactElement[]);

    return <div className="flex items-center">
        {separatedLinks}
    </div>;
}
