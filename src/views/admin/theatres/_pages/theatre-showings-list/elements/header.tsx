/**
 * @fileoverview Header component for the theatre showing list page including a create action.
 */

import {ReactElement} from "react";
import {Plus} from "lucide-react";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {SlugString} from "@/common/_schemas/strings/SlugString.ts";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";
import {
    TheatreShowingListBreadcrumbs
} from "@/views/admin/theatres/_pages/theatre-showings-list/elements/breadcrumbs.tsx";

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