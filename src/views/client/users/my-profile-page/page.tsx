/**
 * @fileoverview Page container for the authenticated user's profile.
 */

import {ReactElement} from "react";
import {useGetAuthUser} from "@/domains/auth/_feat";
import {PageHeader} from "@/views/common/_comp";
import {PageFlexWrapper, PageLoader, PageSectionHeader} from "@/views/common/_comp/page";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {MyProfileNavigation} from "@/views/client/users/_comp/my-profile-nav";
import {MyProfileNavigationDropdown} from "@/views/client/users/_comp";
import {useIsMobile} from "@/common/hooks/use-mobile.tsx";
import {Card, CardContent, Separator} from "@/common/components/ui";
import {UpdateUserPasswordForm, UpdateUserPasswordFormView} from "@/views/client/users";

/**
 * Renders the profile page for the current authenticated user.
 */
export function MyProfilePage(): ReactElement {
    useTitle("My Profile");

    const user = useGetAuthUser();
    const isMobile = useIsMobile();

    if (!user) {
        return <PageLoader/>;
    }

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

