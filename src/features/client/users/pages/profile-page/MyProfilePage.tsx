/**
 * @file MyProfilePage.tsx
 *
 * Root page component for the authenticated user's profile.
 *
 * @remarks
 * - Handles page-level layout and composition.
 * - Resolves the current authenticated user.
 * - Coordinates responsive tab navigation behaviour.
 */

import PageLoader from "@/common/components/page/PageLoader.tsx";
import {useGetAuthUser} from "@/pages/auth/hooks/authUser/useGetAuthUser.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MyProfileHeader from "@/pages/users/components/headers/MyProfileHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MyProfilePageTabs from "@/features/client/users/pages/profile-page/tabs/MyProfilePageTabs.tsx";
import {useMyProfilePageSetup} from "@/pages/users/hooks/my-profie-page/useMyProfilePageSetup.ts";

/**
 * Renders the My Profile page for the current user.
 *
 * - Sets the document title.
 * - Guards access via authentication.
 * - Switches tab navigation UI based on viewport size.
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

            <section className="flex-1 flex flex-col">
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
