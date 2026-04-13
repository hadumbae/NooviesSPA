/**
 * @file MyProfilePage.tsx
 *
 * Page container for the authenticated user's profile.
 *
 * @remarks
 * - Sets the browser document title.
 * - Ensures an authenticated user is present before rendering content.
 * - Coordinates responsive tab navigation behaviour.
 * - Composes header and tab sections within a flexible page layout.
 */

import PageLoader from "@/views/common/_comp/page/PageLoader.tsx";
import {useGetAuthUser} from "@/domains/auth/hooks/authUser/useGetAuthUser.ts";
import useTitle from "@/common/hooks/document/useTitle.ts";
import PageFlexWrapper from "@/views/common/_comp/page/PageFlexWrapper.tsx";
import MyProfileHeader from "@/domains/users/components/headers/MyProfileHeader.tsx";
import {Separator} from "@/common/components/ui/separator.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MyProfilePageTabs from "@/views/client/users/pages/profile-page/tabs/MyProfilePageTabs.tsx";
import {useMyProfilePageSetup} from "@/domains/users/hooks/my-profie-page/useMyProfilePageSetup.ts";
import {cn} from "@/common/lib/utils.ts";

/**
 * Renders the "My Profile" page for the current authenticated user.
 *
 * @remarks
 * - Displays a loading state while resolving authentication.
 * - Switches tab selector placement depending on viewport size.
 * - Delegates profile sections to {@link MyProfilePageTabs}.
 *
 * @returns The fully composed profile page layout, or a loading state
 *          while authentication is being resolved.
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