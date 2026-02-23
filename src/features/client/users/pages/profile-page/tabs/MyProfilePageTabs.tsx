/**
 * @file MyProfilePageTabs.tsx
 *
 * Tabbed content layout for the authenticated user's profile page.
 *
 * @remarks
 * - Manages active tab state via URL search parameters.
 * - Optionally renders tab navigation controls.
 * - Delegates tab-specific UI to dedicated tab components.
 * - Supports responsive layouts where the tab selector may be rendered externally.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";
import {User} from "@/pages/users/schemas/user/User.types.ts";
import ClientRecentReviewsListContainer from "@/pages/users/components/profile/ClientRecentReviewsListContainer.tsx";
import MyProfilePageReservationTab
    from "@/features/client/users/pages/profile-page/tabs/MyProfilePageReservationTab.tsx";
import MyProfilePagePasswordTab from "@/features/client/users/pages/profile-page/tabs/MyProfilePagePasswordTab.tsx";
import {useMyProfilePageSetup} from "@/pages/users/hooks/my-profie-page/useMyProfilePageSetup.ts";
import MyProfilePageFavouriteTab from "@/features/client/users/pages/profile-page/tabs/MyProfilePageFavouriteTab.tsx";
import {cn} from "@/common/lib/utils.ts";

type TabProps = {
    /** Authenticated user whose profile data will populate tab content. */
    user: User;

    /**
     * Controls visibility of the tab selector UI.
     *
     * @defaultValue true
     */
    showTabSelector?: boolean;

    /** Optional className applied to the root tab container. */
    className?: string;
};

/**
 * Renders tab navigation and associated profile content panels.
 *
 * @remarks
 * - Uses {@link useMyProfilePageSetup} to synchronise tab state with URL parameters.
 * - Allows the tab selector (`TabsList`) to be hidden for mobile layouts where
 *   tab switching is handled externally.
 * - Expands active content panels (e.g. reservations or favourites) to fill available space.
 *
 * @param props - {@link TabProps} containing user data and layout configuration.
 *
 * @returns A controlled tab interface containing password, reservations,
 *          reviews, and favourites sections.
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

    const isFull = (tab: MyProfilePageActiveTab) => {
        return activeTab === tab ? "flex-1" : "";
    }

    return (
        <Tabs
            className={cn("flex flex-col space-y-2", className)}
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as MyProfilePageActiveTab)}
        >
            {
                showTabSelector &&
                <section>{tabList}</section>
            }

            <MyProfilePagePasswordTab
                tabValue="password"
                userID={user._id}
            />

            <MyProfilePageReservationTab
                page={resPage}
                setPage={setResPage}
                tabValue="reservations"
                className={isFull("reservations")}
            />

            <TabsContent value="reviews">
                <ClientRecentReviewsListContainer recentReviews={[]}/>
            </TabsContent>

            <MyProfilePageFavouriteTab
                className={isFull("favourites")}
            />
        </Tabs>
    );
};

export default MyProfilePageTabs;