/**
 * @fileoverview Tabbed content layout for the authenticated user's profile page.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/domains/users/_feat/my-profile-page/schema/MyProfilePageTabConstants.ts";
import {MyProfilePageReservationTab} from "@/views/client/users/profile-page/tabs/MyProfilePageReservationTab.tsx";
import {
    MyProfilePagePasswordTab
} from "@/views/client/users/profile-page/tabs/MyProfilePagePasswordTab.tsx";
import {useMyProfilePageSetup} from "@/domains/users/_feat/my-profile-page/hooks/useMyProfilePageSetup.ts";
import {
    MyProfilePageFavouriteTab
} from "@/views/client/users/profile-page/tabs/MyProfilePageFavouriteTab.tsx";
import {cn} from "@/common/lib/utils.ts";
import {ReactElement} from "react";

import {User} from "@/domains/users/schema/user/UserSchema";

/** Props for the MyProfilePageTabs component. */
type TabProps = {
    user: User;
    showTabSelector?: boolean;
    className?: string;
};

/**
 * Renders tab navigation and associated profile content panels.
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
                My Reviews - Remove
            </TabsContent>

            <MyProfilePageFavouriteTab
                className={isFull("favourites")}
            />
        </Tabs>
    );
}
