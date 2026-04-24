/**
 * @fileoverview Header component for the showings tab in the theatre details view.
 */

import {ReactElement} from "react";
import {PageSectionHeader} from "@/views/common/_comp/page";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List, Plus} from "lucide-react";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Props for the TheatreDetailsShowingsTabHeader component. */
type HeaderProps = {
    theatreSlug: SlugString;
};

/**
 * Renders the showings section header with navigation actions for creating and listing showings.
 */
export function TheatreDetailsShowingsTabHeader(
    {theatreSlug}: HeaderProps
): ReactElement {
    return (
        <div className="flex items-center space-x-2">
            <PageSectionHeader className="flex-1">Showings</PageSectionHeader>

            <LoggedLink to={`/admin/theatres/get/${theatreSlug}/showings/create`}>
                <IconButton icon={Plus}/>
            </LoggedLink>

            <LoggedLink to={`/admin/theatres/get/${theatreSlug}/showings/list`}>
                <IconButton icon={List}/>
            </LoggedLink>
        </div>
    );
}