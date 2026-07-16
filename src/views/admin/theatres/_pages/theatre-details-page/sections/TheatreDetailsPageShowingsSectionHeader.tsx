/**
 * @fileoverview Header component for the showings tab in the theatre details view.
 */

import {ReactElement} from "react";
import {List, Plus} from "lucide-react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {IconButton} from "@/views/common/_comp";
import {SlugString} from "@/common/_schemas/strings/slug-strings/SlugString.ts";

/** Props for the TheatreDetailsShowingsTabHeader component. */
type HeaderProps = {
    theatreSlug: SlugString;
};

/**
 * Renders the showings section header with navigation actions for creating and listing showings.
 */
export function TheatreDetailsPageShowingsSectionHeader(
    {theatreSlug}: HeaderProps
): ReactElement {
    return (
        <div className="flex items-center space-x-2">
            <PageSectionHeader className="flex-1" text="Showings"/>

            <LoggedLink to={`/admin/theatres/get/${theatreSlug}/showings/create`}>
                <IconButton icon={Plus}/>
            </LoggedLink>

            <LoggedLink to={`/admin/theatres/get/${theatreSlug}/showings/list`}>
                <IconButton icon={List}/>
            </LoggedLink>
        </div>
    );
}