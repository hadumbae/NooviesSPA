/**
 * @fileoverview Page container for the authenticated user's profile.
 */

import {ReactElement} from "react";
import {useGetCurrentUser} from "@/domains/auth/_feat";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {MyProfilePageContent} from "@/views/client/users/my-profile-page/content.tsx";

/**
 * Renders the profile page for the current authenticated user.
 */
export function MyProfilePage(): ReactElement {
    useTitle("My Profile");
    const user = useGetCurrentUser();

    return (
        <MyProfilePageContent
            user={user}
        />
    );
}

