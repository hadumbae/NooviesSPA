/**
 * @fileoverview Content layout for the user profile page including navigation and password update forms.
 */

import {ReactElement} from "react";
import {PageFlexWrapper, PageSectionHeader} from "@/views/common/_comp/page";
import {PageHeader} from "@/views/common/_comp";
import {
    MyProfileNavigation,
    MyProfileNavigationDropdown
} from "@/views/client/users/_comp/my-profile-nav";
import {
    UpdateUserPasswordForm,
    UpdateUserPasswordFormView
} from "@/views/client/users/_feat/update-user-password/form";
import {Card, CardContent, Separator} from "@/views/common/_comp/ui";
import {User} from "@/domains/users/_schema/user/UserSchema.ts";
import {useIsMobile} from "@/common/_feat/handle-ui/useIsMobile.tsx";

/** Props for the MyProfilePageContent component. */
type ContentProps = {
    user: User;
};

/** Renders the user profile management interface with responsive navigation and security settings. */
export function MyProfilePageContent(
    {user}: ContentProps
): ReactElement {
    const isMobile = useIsMobile();

    return (
        <PageFlexWrapper>
            <PageHeader
                title={`Hello, ${user.name}!`}
                description="My Profile | Information"
                actions={isMobile && <MyProfileNavigationDropdown />}
            />

            <Separator/>

            {
                !isMobile &&
                <MyProfileNavigation/>
            }

            <div className="space-y-4">
                <PageSectionHeader text="Update Password" />

                <Card>
                    <CardContent className="p-4">
                        <UpdateUserPasswordForm userID={user._id}>
                            <UpdateUserPasswordFormView />
                        </UpdateUserPasswordForm>
                    </CardContent>
                </Card>
            </div>
        </PageFlexWrapper>
    );
}