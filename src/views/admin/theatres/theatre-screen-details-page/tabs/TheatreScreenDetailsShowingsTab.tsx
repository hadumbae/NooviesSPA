/**
 * @fileoverview Tab content component for displaying a summary list of upcoming showings
 * associated with a specific theatre screen.
 */

import {TabsContent} from "@/common/components/ui/tabs.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ShowingDetails, ShowingDetailsSchema} from "@/domains/showings/schema/showing";
import EmptyArrayContainer from "@/common/components/text/EmptyArrayContainer.tsx";
import {cn} from "@/common/lib/utils.ts";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchShowings} from "@/domains/showings/_feat/crud-hooks";
import {ShowingSummaryCard} from "@/views/admin/showings/_comp/showing-summary-card";

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

    const query = useFetchShowings({
        queries: {screen: screenID, sortByStartTime: 1},
        config: {virtuals: true, populate: true, limit: 10},
        schema: generateArraySchema(ShowingDetailsSchema),
    });

    return (
        <TabsContent value="showings" className="space-y-4">
            <div className="flex justify-between items-center">
                <PageSectionHeader>Recent Showings</PageSectionHeader>

                <LoggedLink to={showingIndexURL}>
                    <IconButton icon={List}/>
                </LoggedLink>
            </div>

            <QueryDataLoader query={query}>
                {(showings: ShowingDetails[]) => {
                    if (showings.length === 0) {
                        return (
                            <EmptyArrayContainer
                                className="h-28"
                                text="There Are No Showings"
                            />
                        );
                    }

                    return (
                        <div className={cn("grid grid-cols-1 gap-2")}>
                            {showings.map((showing) => (
                                <ShowingSummaryCard key={showing._id} showing={showing}/>
                            ))}
                        </div>
                    );
                }}
            </QueryDataLoader>
        </TabsContent>
    );
}