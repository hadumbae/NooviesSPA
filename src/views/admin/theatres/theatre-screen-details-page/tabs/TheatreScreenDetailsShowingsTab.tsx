/**
 * @fileoverview Tab content component for displaying a summary list of upcoming showings
 * associated with a specific theatre screen.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import ShowingSummaryListQuery
    from "@/domains/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";
import {ReactElement} from "react";

/** Props for the TheatreScreenDetailsShowingsTab component. */
type TabProps = {
    screenID: ObjectId;
};

/**
 * Renders a list of the next 10 showings for the screen, ordered by start time.
 */
export function TheatreScreenDetailsShowingsTab(
    {screenID}: TabProps
): ReactElement {
    const showingIndexURL = `/admin/showings?screen=${screenID}`;

    return (
        <TabsContent value="showings" className="space-y-4">
            <div className="flex justify-between items-center">
                <PrimaryHeaderText>Recent Showings</PrimaryHeaderText>

                <LoggedLink to={showingIndexURL}>
                    <IconButton icon={List}/>
                </LoggedLink>
            </div>

            <ShowingSummaryListQuery
                sortByStartTime={1}
                screen={screenID}
                limit={10}
            />
        </TabsContent>
    );
}