/**
 * @fileoverview Navigation button component for the user profile sidebar.
 */

import {ReactElement, ReactNode} from "react";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {cn} from "@/common/_feat";
import {buttonVariants} from "@/views/common/_comp/ui";
import {useLocation} from "react-router-dom";

/** Props for the MyProfileNavigationButton component. */
type ButtonProps = {
    children: ReactNode
    to: string;
};

/**
 * A navigation link that applies active styling based on the current route.
 */
export function MyProfileNavigationButton(
    {children, to}: ButtonProps
): ReactElement {
    const location = useLocation();
    const isActive = to === location.pathname;

    return (
        <LoggedLink to={to} className={cn(
            buttonVariants({variant: isActive ? "secondary" : "link", size: "sm"})
        )}>
            {children}
        </LoggedLink>
    );
}