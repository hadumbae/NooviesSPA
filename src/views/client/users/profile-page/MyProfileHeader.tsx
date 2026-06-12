/**
 * @file MyProfileHeader.tsx
 *
 * Header for the current user's profile page.
 *
 * Displays a greeting, page context, and an optional
 * tab selection control for profile navigation.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageActiveTabSchema.ts";
import {
    MyProfilePageTabDropdown
} from "@/views/client/users/profile-page/tabs/MyProfilePageTabDropdown.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";

import {User} from "@/domains/users/schema/user/UserSchema";

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
