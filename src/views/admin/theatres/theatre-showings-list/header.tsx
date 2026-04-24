/**
 * @fileoverview Header component for the theatre showing list page including a create action.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Plus} from "lucide-react";
import {ReactElement} from "react";
import {TheatreShowingListBreadcrumbs} from "@/views/admin/theatres/theatre-showings-list/breadcrumbs.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";

/** Props for the TheatreShowingListHeader component. */
type HeaderProps = {
    theatreSlug: SlugString;
    theatreName: string;
    showingCount: number;
};

/**
 * Renders the header section for a theatre showing list page with breadcrumbs and actions.
 */
export function TheatreShowingListHeader(
    {theatreSlug, theatreName, showingCount}: HeaderProps
): ReactElement {
    return (
        <header className='space-y-2'>
            <TheatreShowingListBreadcrumbs theatreSlug={theatreSlug} theatreName={theatreName}/>
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <HeaderTitle>{theatreName}</HeaderTitle>
                    <HeaderDescription>Showings At Theatre • {showingCount} Showings</HeaderDescription>
                </div>

                <LoggedLink to={`/admin/theatres/get/${theatreSlug}/showings/create`}>
                    <IconButton aria-describedby="plus-link-button" icon={Plus}/>
                </LoggedLink>
            </div>
        </header>
    );
}