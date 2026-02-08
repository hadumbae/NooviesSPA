/**
 * @file MyProfileHeader.tsx
 *
 * Header for the current user's profile page.
 *
 * Displays a greeting, page context, and an optional
 * tab selection control for profile navigation.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import MyProfilePageTabDropdown from "@/features/client/users/pages/profile-page/tabs/MyProfilePageTabDropdown.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

type MyProfileHeaderProps = {
    /** Authenticated user whose profile is being displayed */
    user: User;

    /** Updates the active profile tab */
    setTab: (tab: MyProfilePageActiveTab) => void;

    /** Toggles visibility of the tab selector dropdown */
    showTabSelector?: boolean;
};

/**
 * Renders the profile page header for the authenticated user.
 */
const MyProfileHeader = (
    {user, setTab, showTabSelector = true}: MyProfileHeaderProps
) => {
    const {name} = user;

    return (
        <header className="flex justify-between items-center">
            <section>
                <SectionHeader srOnly={true}>My Profile : Page Meta</SectionHeader>

                <HeaderTitle>Hello, {name}!</HeaderTitle>
                <HeaderDescription>My Profile | Information</HeaderDescription>
            </section>

            {showTabSelector && (
                <section>
                    <SectionHeader srOnly={true}>My Profile : Tabs Dropdown</SectionHeader>
                    <MyProfilePageTabDropdown setTab={setTab}/>
                </section>
            )}
        </header>
    );
};

export default MyProfileHeader;
