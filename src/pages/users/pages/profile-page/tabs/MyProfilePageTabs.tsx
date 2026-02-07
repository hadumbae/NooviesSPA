/**
 * @file MyProfilePageTabs.tsx
 *
 * Tab-based layout for the My Profile page.
 * Controls active tab state and renders tab navigation and content.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import ClientRecentFavouritesListContainer
    from "@/pages/users/components/profile/ClientRecentFavouritesListContainer.tsx";
import ClientRecentReviewsListContainer from "@/pages/users/components/profile/ClientRecentReviewsListContainer.tsx";
import MyProfilePageReservationTab from "@/pages/users/pages/profile-page/tabs/MyProfilePageReservationTab.tsx";
import MyProfilePagePasswordTab from "@/pages/users/pages/profile-page/tabs/MyProfilePagePasswordTab.tsx";

type TabProps = {
    user: User;

    /** Whether the tab selector UI should be rendered */
    showTabSelector?: boolean;

    /** Currently active profile page tab */
    activeTab: MyProfilePageActiveTab;

    /** Updates the active profile page tab */
    setActiveTab: (tab: MyProfilePageActiveTab) => void;

    className?: string;
};

/**
 * Renders the My Profile page tabs and associated content.
 *
 * Tab navigation can be conditionally hidden for alternative
 * layouts while still supporting controlled tab state.
 */
const MyProfilePageTabs = (
    {user, activeTab, setActiveTab, className, showTabSelector = true}: TabProps
) => {

    /**
     * Tab selector UI derived from the profile page tab constants.
     */
    const tabList = (
        <TabsList>
            {MyProfilePageTabKeysConstant.map(({key, label}) => (
                <TabsTrigger key={key} value={key}>{label}</TabsTrigger>
            ))}
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
