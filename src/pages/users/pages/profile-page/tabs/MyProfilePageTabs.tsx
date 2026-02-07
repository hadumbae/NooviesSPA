/**
 * @file MyProfilePageTabs.tsx
 *
 * Tab-based layout for the My Profile page.
 * Controls active tab state and renders tab navigation and content.
 */

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/common/components/ui/tabs.tsx";
import {MyProfilePageActiveTab} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageActiveTabSchema.ts";
import {MyProfilePageTabKeysConstant} from "@/pages/users/schemas/tabs/my-profile-page/MyProfilePageTabConstants.ts";

type TabProps = {
    /** Whether the tab selector UI should be rendered */
    showTabSelector?: boolean;

    /** Currently active profile page tab */
    activeTab?: MyProfilePageActiveTab;

    /** Updates the active profile page tab */
    setActiveTab: (tab: MyProfilePageActiveTab) => void;
};

/**
 * Renders the My Profile page tabs and associated content.
 *
 * Tab navigation can be conditionally hidden for alternative
 * layouts while still supporting controlled tab state.
 */
const MyProfilePageTabs = (
    {activeTab, setActiveTab, showTabSelector = true}: TabProps
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
            value={activeTab ?? "password"}
            onValueChange={(val) =>
                setActiveTab(val as MyProfilePageActiveTab)
            }
        >
            {showTabSelector && tabList}

            <TabsContent value="password">Update Password</TabsContent>
            <TabsContent value="reservations">My Reservations</TabsContent>
            <TabsContent value="reviews">My Reviews</TabsContent>
            <TabsContent value="favourites">My Favourites</TabsContent>
        </Tabs>
    );
};

export default MyProfilePageTabs;
