/**
 * @fileoverview Page container for the authenticated user's profile.
 */

import {PageLoader} from "@/views/common/_comp/page";
import {useGetAuthUser} from "@/domains/auth/hooks/authUser/useGetAuthUser.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {PageFlexWrapper} from "@/views/common/_comp/page";
import MyProfileHeader from "@/domains/users/components/headers/MyProfileHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MyProfilePageTabs from "@/views/client/users/pages/profile-page/tabs/MyProfilePageTabs.tsx";
import {useMyProfilePageSetup} from "@/domains/users/hooks/my-profie-page/useMyProfilePageSetup.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Renders the profile page for the current authenticated user.
 */
const MyProfilePage = () => {
    useTitle("My Profile");

    const user = useGetAuthUser();
    if (!user) return <PageLoader/>;

    const {isMobile, setters: {setActiveTab}} = useMyProfilePageSetup();

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
};

export default MyProfilePage;