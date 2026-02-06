/**
 * @file MyProfileHeader.tsx
 *
 * Header component for the current user's profile page.
 * Displays a friendly greeting using the user's name.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";

type MyProfileHeaderProps = {
    /** Authenticated user whose profile is being displayed */
    user: User;
};

/**
 * Renders the profile header for the current user.
 *
 * @param user - User data used for display
 */
const MyProfileHeader = (
    {user}: MyProfileHeaderProps
) => {
    const {name} = user;

    return (
        <header>
            <section>
                <HeaderTitle>Hello, {name}!</HeaderTitle>
                <HeaderDescription>My Profile | Information</HeaderDescription>
            </section>
        </header>
    );
};

export default MyProfileHeader;
