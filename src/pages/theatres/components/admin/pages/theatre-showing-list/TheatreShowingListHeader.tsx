/**
 * @file TheatreShowingListHeader.tsx
 *
 * @summary
 * Header component for the theatre showing list page, including a create-showing action.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Plus} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link TheatreShowingListHeader}.
 */
type HeaderProps = {
    /** Theatre identifier used for routing */
    theatreID: ObjectId;

    /** Name of the theatre */
    theatreName: string;

    /** Total number of showings at the theatre */
    showingCount: number;
};

/**
 * Renders the header section for a theatre showing list page.
 *
 * Displays:
 * - Theatre name
 * - Showing count summary
 * - Action button to create a new showing
 *
 * @param props - Component props
 * @returns Theatre showing list header
 */
const TheatreShowingListHeader = ({theatreID, theatreName, showingCount}: HeaderProps) => {
    return (
        <header className="flex justify-between items-center">
            <div className="space-y-1">
                <HeaderTitle>{theatreName}</HeaderTitle>
                <HeaderDescription>Showings At Theatre | {showingCount} Showings</HeaderDescription>
            </div>

            <LoggedLink
                to={`/admin/theatres/get/${theatreID}/showings/create`}
                component={TheatreShowingListHeader.name}
            >
                <IconButton aria-describedby="plus-link-button">
                    <Plus/>
                </IconButton>
            </LoggedLink>
        </header>
    );
};

export default TheatreShowingListHeader;
