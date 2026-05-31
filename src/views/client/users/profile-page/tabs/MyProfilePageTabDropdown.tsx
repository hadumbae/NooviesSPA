/**
 * @fileoverview Dropdown-based tab selector for the My Profile page.
 */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";
import {ReactElement} from "react";

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
