/**
 * @fileoverview Page container for the authenticated user's profile.
 */

import {PageFlexWrapper, PageLoader} from "@/views/common/_comp/page";
import {useGetAuthUser} from "@/domains/auth/_feat/manage-auth-user-data/hooks/useGetAuthUser.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MyProfileHeader from "@/domains/users/components/headers/MyProfileHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import {MyProfilePageTabs} from "@/views/client/users/profile-page/tabs/MyProfilePageTabs.tsx";
import {useMyProfilePageSetup} from "@/domains/users/hooks/my-profie-page/useMyProfilePageSetup.ts";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/**
 * Renders the profile page for the current authenticated user.
 */
export function MyProfilePage(): ReactElement {
    useTitle("My Profile");

    const user = useGetAuthUser();
    const {isMobile, setters: {setActiveTab}} = useMyProfilePageSetup();

    if (!user) {
        return <PageLoader/>;
    }

    return (
        <PageFlexWrapper>
            <MyProfileHeader
                user={user}
                setTab={setActiveTab}
                showTabSelector={isMobile}
            />

            <Separator/>

            <section className={cn("flex-1", "flex flex-col")}>
                <SectionHeader srOnly={true}>Tabs</SectionHeader>

                <MyProfilePageTabs
                    user={user}
                    showTabSelector={!isMobile}
                    className="flex-1"
                />
            </section>
        </PageFlexWrapper>
    );
}

