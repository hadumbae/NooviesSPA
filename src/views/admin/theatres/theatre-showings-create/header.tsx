/**
 * @fileoverview Header component for the theatre showing creation page.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {List} from "lucide-react";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ReactElement} from "react";
import {
    TheatreShowingCreateBreadcrumbs
} from "@/views/admin/theatres/theatre-showings-create/breadcrumbs.tsx";

/** Props for the TheatreShowingCreateHeader component. */
type HeaderProps = {
    theatreID: ObjectId;
    theatreName: string;
};

/**
 * Renders the header section for creating showings under a specific theatre.
 */
export function TheatreShowingCreateHeader(
    {theatreID, theatreName}: HeaderProps
): ReactElement {
    return (
        <header className="space-y-2">
            <TheatreShowingCreateBreadcrumbs theatreID={theatreID} theatreName={theatreName}/>

            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <HeaderTitle>{theatreName} | Showings</HeaderTitle>
                    <HeaderDescription>Create showings for theatre here.</HeaderDescription>
                </div>

                <LoggedLink to={`/admin/theatres/get/${theatreID}/showings/list`}>
                    <IconButton aria-describedby="plus-link-button" icon={List}/>
                </LoggedLink>
            </div>
        </header>
    );
}