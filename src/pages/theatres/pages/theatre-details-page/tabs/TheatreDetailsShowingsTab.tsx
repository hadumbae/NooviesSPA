/**
 * @file TheatreDetailsShowingsTab.tsx
 *
 * @summary
 * Tab component displaying showings for a specific theatre.
 *
 * @description
 * Renders a list of scheduled showings with quick access
 * buttons for creating new showings or viewing the full list.
 * Uses the ShowingSummaryListQuery component for data fetching
 * and displays results in a paginated summary view.
 */

import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { List, Plus } from "lucide-react";
import ShowingSummaryListQuery from "@/pages/showings/components/features/showing-summary-list-query/ShowingSummaryListQuery.tsx";

/**
 * @summary Props for TheatreDetailsShowingsTab.
 */
type ContentProps = {
    /** ID of the theatre to display showings for. */
    theatreID: ObjectId;

    /** Optional CSS class for styling the tab content container. */
    className?: string;
};

/**
 * @summary Theatre showings tab component.
 *
 * @description
 * Displays the scheduled showings for a theatre within a tab
 * layout. Provides buttons to create new showings or view all showings.
 *
 * @param theatreID - The ID of the theatre.
 * @param className - Optional CSS class for the container.
 */
const TheatreDetailsShowingsTab = ({ theatreID, className }: ContentProps) => {
    return (
        <div className={className}>
            <div className="flex items-center space-x-2">
                <PrimaryHeaderText className="flex-1">Showings</PrimaryHeaderText>

                <LoggedLink
                    component={TheatreDetailsShowingsTab.name}
                    to={`/admin/theatres/get/${theatreID}/showings/create`}
                >
                    <IconButton> <Plus /> </IconButton>
                </LoggedLink>

                <LoggedLink
                    component={TheatreDetailsShowingsTab.name}
                    to={`/admin/theatres/get/${theatreID}/showings/list`}
                >
                    <IconButton> <List /> </IconButton>
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
};

export default TheatreDetailsShowingsTab;
