/**
 * @fileoverview Navigation link component that tracks active state based on the current route.
 */

import {ReactElement} from 'react';
import {cn} from "@/common/_feat/handle-ui/cn.ts";
import {useLocation} from "react-router-dom";
import {LoggedLinkProps} from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import ButtonLink from "@/common/components/navigation/ButtonLink.tsx";

/**
 * A navigation link that applies active styling when its destination matches the current URL.
 */
export default function NavLink(
    {children, className, to, ...rest}: LoggedLinkProps
): ReactElement {
    const {pathname, search, hash} = useLocation();
    const isActive = to === `${pathname}${search}${hash}`;

    return (
        <ButtonLink{...rest} to={to} variant="link" size="sm" className={cn(!isActive && "hover-button", className)}>
            {children}
        </ButtonLink>
    );
}
