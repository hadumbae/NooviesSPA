/**
 * @file MyProfilePageTabs.tsx
 *
 * Tab-based layout for the My Profile page.
 *
 * Manages active tab state, renders optional tab navigation,
 * and displays tab-specific profile content.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import ClientRecentFavouritesListContainer
    from "@/pages/users/components/profile/ClientRecentFavouritesListContainer.tsx";
import ClientRecentReviewsListContainer from "@/pages/users/components/profile/ClientRecentReviewsListContainer.tsx";
import MyProfilePageReservationTab from "@/features/client/users/pages/profile-page/tabs/MyProfilePageReservationTab.tsx";
import MyProfilePagePasswordTab from "@/features/client/users/pages/profile-page/tabs/MyProfilePagePasswordTab.tsx";
import {useMyProfilePageSetup} from "@/pages/users/hooks/my-profie-page/useMyProfilePageSetup.ts";

type TabProps = {
    /** Authenticated user whose profile is being rendered */
    user: User;

    /** Controls visibility of the tab selector UI */
    showTabSelector?: boolean;

    className?: string;
};

/**
 * Renders profile tabs and associated tab content.
 *
 * Supports controlled tab state and optional tab navigation,
 * allowing reuse in alternative layouts.
 */
const MyProfilePageTabs = (
    {user, className, showTabSelector = true}: TabProps
) => {

    const {searchParams, setters} = useMyProfilePageSetup();
    const {activeTab, resPage} = searchParams;
    const {setActiveTab, setResPage} = setters;

    /**
     * Tab selector generated from profile tab constants.
     */
    const tabList = (
        <TabsList>
            {MyProfilePageTabKeysConstant.map(
                ({key, label}) => <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            )}
        </TabsList>
    );

    return (
        <Tabs
            className={className}
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as MyProfilePageActiveTab)}
        >
            {showTabSelector && tabList}

            <MyProfilePagePasswordTab
                tabValue="password"
                userID={user._id}
            />

            <MyProfilePageReservationTab
                page={resPage}
                setPage={setResPage}
                tabValue="reservations"
                className={activeTab === "reservations" ? "h-full" : ""}
            />

            <TabsContent value="reviews">
                <ClientRecentReviewsListContainer recentReviews={[]}/>
            </TabsContent>

            <TabsContent value="favourites">
                <ClientRecentFavouritesListContainer recentFavourites={[]}/>
            </TabsContent>
        </Tabs>
    );
};

export default MyProfilePageTabs;
