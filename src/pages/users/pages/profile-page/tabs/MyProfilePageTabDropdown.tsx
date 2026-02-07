/**
 * @file MyProfilePageTabDropdown.tsx
 *
 * Dropdown-based tab selector for the My Profile page.
 * Used as an alternative to the tab list in compact or
 * responsive layouts.
 */

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/common/components/ui/dropdown-menu.tsx";
import {Button} from "@/common/components/ui/button.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";

type DropdownProps = {
    /** Updates the currently active profile page tab */
    setTab: (tab: MyProfilePageActiveTab) => void;
};

/**
 * Renders a dropdown menu for selecting the active
 * My Profile page tab.
 *
 * Intended for use when horizontal tab space
 * is constrained.
 */
const MyProfilePageTabDropdown = ({setTab}: DropdownProps) => {
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
};

export default MyProfilePageTabDropdown;
