/**
 * @fileoverview Defines the Showings tab content for the Movie Details page.
 * Displays a summary list of movie screenings and provides a direct link
 * to the full showings management index.
 */

import {ReactElement} from "react";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import ShowingSummaryListQuery
    from "@/domains/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";
import {TabsContent} from "@/common/components/ui/tabs.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

type TabProps = {
    movieID: ObjectId;
};

/**
 * Renders a list of upcoming or existing showings for a specific movie.
 */
export function MovieDetailsPageShowingsTab(
    {movieID}: TabProps
): ReactElement {
    return (
        <TabsContent value="showings" className="space-y-4">
            <div className="flex justify-between items-center">
                <PrimaryHeaderText>Showings</PrimaryHeaderText>

                <LoggedLink to={`/admin/showings?movie=${movieID}`}>
                    <IconButton icon={List}/>
                </LoggedLink>
            </div>

            <ShowingSummaryListQuery movie={movieID} sortByStartTime={1} limit={10}/>
        </TabsContent>
    );
}