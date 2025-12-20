/**
 * @file ScreenDetailsShowingsTab.tsx
 *
 * @summary
 * Tab content displaying recent showings for a screen.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import ShowingSummaryListQuery
    from "@/pages/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";

/**
 * Props for {@link ScreenDetailsShowingsTab}.
 */
type TabProps = {
    /** Screen identifier used to scope showings. */
    screenID: ObjectId;
};

/**
 * Renders the "Showings" tab for a screen detail view.
 *
 * Displays a header with navigation to the full showings index
 * and a limited list of upcoming showings for the screen.
 *
 * @param props Component props.
 */
const ScreenDetailsShowingsTab = ({screenID}: TabProps) => {
    const showingIndexURL = `/admin/showings?screen=${screenID}`;

    return (
        <TabsContent value="showings" className="space-y-3">
            <div className="flex justify-between items-center">
                <PrimaryHeaderText>Showings</PrimaryHeaderText>
                <LoggedLink to={showingIndexURL}>
                    <IconButton>
                        <List/>
                    </IconButton>
                </LoggedLink>
            </div>

            <ShowingSummaryListQuery
                sortByStartTime={1}
                screen={screenID}
                limit={10}
            />
        </TabsContent>
    );
};

export default ScreenDetailsShowingsTab;
