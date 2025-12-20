/**
 * @file TheatreRecentShowingListContent.tsx
 *
 * @summary
 * Presentation component for displaying a theatre’s recent showings.
 */

import { cn } from "@/common/lib/utils.ts";
import { SecondaryTextBaseCSS } from "@/common/constants/css/TextCSS.ts";
import ShowingSummaryCard from "@/pages/showings/components/admin/card/showing-summary-card/ShowingSummaryCard.tsx";
import PrimaryHeaderText from "@/common/components/text/header/PrimaryHeaderText.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import { List, Plus } from "lucide-react";
import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import { ObjectId } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";

/**
 * Props for {@link TheatreRecentShowingListContent}.
 */
type ContentProps = {
    /** Theatre identifier used for navigation */
    theatreID: ObjectId;

    /** Recently fetched showings */
    showings: ShowingDetails[];
};

/**
 * Renders a compact list of recent showings for a theatre.
 *
 * Displays:
 * - Empty state when no showings exist
 * - Header with create and list navigation actions
 * - Showing summary cards
 *
 * @param props - Component props
 * @returns Recent theatre showing list content
 */
const TheatreRecentShowingListContent = ({ theatreID, showings }: ContentProps) => {
    // --- Empty State ---
    if (showings.length === 0) {
        return (
            <div className="h-28 flex justify-center items-center">
                <span className={cn(SecondaryTextBaseCSS, "select-none capitalize")}>
                    No Showings
                </span>
            </div>
        );
    }

    // --- Render ---
    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <PrimaryHeaderText className="flex-1">
                    Showings
                </PrimaryHeaderText>

                <LoggedLink
                    component={TheatreRecentShowingListContent.name}
                    to={`/admin/theatres/get/${theatreID}/showings/create`}
                >
                    <IconButton>
                        <Plus />
                    </IconButton>
                </LoggedLink>

                <LoggedLink
                    component={TheatreRecentShowingListContent.name}
                    to={`/admin/theatres/get/${theatreID}/showings/list`}
                >
                    <IconButton>
                        <List />
                    </IconButton>
                </LoggedLink>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {showings.map(
                    (showing) => (
                        <ShowingSummaryCard
                            key={showing._id}
                            showing={showing}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default TheatreRecentShowingListContent;
