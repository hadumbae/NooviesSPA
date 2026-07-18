/**
 * @fileoverview A dropdown menu item component that handles navigation within the SPA.
 */

import {ReactElement, ReactNode} from 'react';
import {cn} from "@/common/_feat";
import {DropdownMenuItem} from "@/common/components/ui/dropdown-menu.tsx";
import {useCurrentURLPath} from "@/common/_feat/navigation/useCurrentURLPath.ts";
import {To, useNavigate} from "react-router-dom";

/** Props for the DropdownMenuLink component. */
type LinkProps = {
    to: To;
    children: ReactNode;
};

/**
 * A navigation link styled as a dropdown menu item that highlights when active.
 */
export function DropdownMenuLink(
    {children, to}: LinkProps
): ReactElement {
    const navigate = useNavigate();
    const url = useCurrentURLPath();

    const navigateToPath = () => navigate(to);
    const isActive = url === to;

    return (
        <DropdownMenuItem className={cn(!isActive && "hover-link-text")} onClick={navigateToPath}>
            {children}
        </DropdownMenuItem>
    );
}
