/**
 * @fileoverview Navigation link component that tracks active state based on the current route.
 */

import {ReactElement} from 'react';
import {cn, useCurrentURLPath} from "@/common/_feat";
import {Link, LinkProps} from "react-router-dom";
import {buttonVariants} from "@/common/components/ui";

/**
 * A navigation link that applies active styling when its destination matches the current URL.
 */
export function LayoutNavLink(
    {children, className, ...props}: LinkProps
): ReactElement {
    const path = useCurrentURLPath();
    const isActive = props.to === path;

    return (
        <Link {...props} className={cn(
            buttonVariants({variant: "link", size: "sm"}),
            !isActive && "hover-button", className,
        )}>
            {children}
        </Link>
    );
}
