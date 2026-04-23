/**
 * @fileoverview Tab component for the Theatre Details page that lists scheduled movie showings.
 */

import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List, Plus} from "lucide-react";
import ShowingSummaryListQuery
    from "@/domains/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";
import {ReactElement} from "react";

/** Props for the TheatreDetailsShowingsTab component. */
type ContentProps = {
    theatreID: ObjectId;
    className?: string;
};

/**
 * Renders a list of active scheduled showings for a theatre, accompanied by
 * administrative actions to create or manage the full showings list.
 */
export function TheatreDetailsShowingsTab(
    {theatreID, className}: ContentProps
): ReactElement {
    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <PrimaryHeaderText className="flex-1">Showings</PrimaryHeaderText>

                {/* Create New Showing */}
                <LoggedLink
                    component={TheatreDetailsShowingsTab.name}
                    to={`/admin/theatres/get/${theatreID}/showings/create`}
                >
                    <IconButton> <Plus/> </IconButton>
                </LoggedLink>

                {/* View Full List */}
                <LoggedLink
                    component={TheatreDetailsShowingsTab.name}
                    to={`/admin/theatres/get/${theatreID}/showings/list`}
                >
                    <IconButton> <List/> </IconButton>
                </LoggedLink>
            </div>

            <ShowingSummaryListQuery
                theatre={theatreID}
                sortByStartTime={1}
                status="SCHEDULED"
                isActive={true}
                limit={10}
            />
        </div>
    );
}