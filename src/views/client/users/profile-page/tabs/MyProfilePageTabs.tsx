/**
 * @fileoverview Tabbed content layout for the authenticated user's profile page.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/domains/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";
import {User} from "@/domains/users/schemas/user/User.types.ts";
import ClientRecentReviewsListContainer from "@/domains/users/components/profile/ClientRecentReviewsListContainer.tsx";
import {MyProfilePageReservationTab} from "@/views/client/users/profile-page/tabs/MyProfilePageReservationTab.tsx";
import {
    MyProfilePagePasswordTab
} from "@/views/client/users/profile-page/tabs/MyProfilePagePasswordTab.tsx";
import {useMyProfilePageSetup} from "@/domains/users/hooks/my-profie-page/useMyProfilePageSetup.ts";
import {
    MyProfilePageFavouriteTab
} from "@/views/client/users/profile-page/tabs/MyProfilePageFavouriteTab.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

/** Props for the MyProfilePageTabs component. */
type TabProps = {
    user: User;
    showTabSelector?: boolean;
    className?: string;
};

/**
 * Renders tab navigation and associated profile content panels.
 * Synchronizes active tab state with URL parameters via useMyProfilePageSetup.
 */
export function MyProfilePageTabs(
    {user, className, showTabSelector = true}: TabProps
): ReactElement {
    const {searchParams, setters} = useMyProfilePageSetup();
    const {activeTab, resPage} = searchParams;
    const {setActiveTab, setResPage} = setters;

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
}
