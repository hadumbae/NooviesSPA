/**
 * @fileoverview Dropdown-based tab selector for the My Profile page.
 */

import {ReactElement} from "react";
import {MyProfilePageActiveTab, MyProfilePageTabKeysConstant} from "@/domains/users";
import {Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/common/components/ui";

/** Props for the MyProfilePageTabDropdown component. */
type DropdownProps = {
    setTab: (tab: MyProfilePageActiveTab) => void;
};

/**
 * Renders a dropdown menu for selecting the active My Profile page tab in constrained layouts.
 */
export function MyProfilePageTabDropdown(
    {setTab}: DropdownProps
): ReactElement {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Tabs</Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {MyProfilePageTabKeysConstant.map(({key, label}) => (
                    <DropdownMenuItem
                        key={key}
                        onClick={() => setTab(key)}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
