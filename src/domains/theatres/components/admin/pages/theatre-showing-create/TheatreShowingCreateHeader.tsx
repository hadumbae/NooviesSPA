/**
 * @file TheatreShowingCreateHeader.tsx
 *
 * @summary
 * Header component for the theatre showing creation page.
 *
 * @description
 * Displays the theatre name as the page title along with a short description
 * indicating that the page is used to create showings for the selected theatre.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Props for {@link TheatreShowingCreateHeader}.
 */
type HeaderProps = {
    theatreID: ObjectId;

    /**
     * Display name of the theatre.
     */
    theatreName: string;
};

/**
 * Renders the header section for creating showings under a specific theatre.
 *
 * @param props - Component props.
 * @returns A page header containing the theatre name and a description.
 */
const TheatreShowingCreateHeader = ({theatreID, theatreName}: HeaderProps) => {
    return (
        <header className="flex justify-between items-center">
            <div className="space-y-1">
                <HeaderTitle>{theatreName} | Showings</HeaderTitle>
                <HeaderDescription>Create showings for theatre here.</HeaderDescription>
            </div>

            <LoggedLink
                to={`/admin/theatres/get/${theatreID}/showings/list`}
                component={TheatreShowingCreateHeader.name}
            >
                <IconButton aria-describedby="plus-link-button">
                    <List />
                </IconButton>
            </LoggedLink>
        </header>
    );
};

export default TheatreShowingCreateHeader;
