/**
 * @fileoverview Header component for the showing details admin page.
 */

import {ReactElement} from 'react';
import {DateTime} from "luxon";
import {Ellipsis} from "lucide-react";
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {SlugString} from "@/common/schema/strings/simple-strings/SlugString.ts";
import useRequiredContext from "@/common/hooks/context/useRequiredContext.ts";

import {MovieTitle} from "@/domains/movies";
import {ShowingDetailsUISetterContext} from "@/domains/showings/_ctx";
import {ShowingDetailsPageBreadcrumbs} from "@/views/admin/showings/_pages/details-page/elements/breadcrumbs.tsx";
import {ShowingDetailsPageToggles} from "@/views/admin/showings/_pages/details-page/elements/toggles.tsx";

/** Props for the ShowingDetailsHeader component. */
type HeaderProps = {
    showingSlug: SlugString;
    showingStartTime: DateTime;
    movieTitle: MovieTitle;
    releaseDate?: DateTime | null;
    screenName: string;
    theatreName: string;
}

/**
 * Displays the movie title, release year, and location details for a specific showing.
 */
export function ShowingDetailsHeader(
    {showingSlug, showingStartTime, movieTitle, releaseDate, screenName, theatreName}: HeaderProps
): ReactElement {
    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const {setIsDeleting} = useRequiredContext({context: ShowingDetailsUISetterContext});

    return (
        <header className="space-y-3">
            <ShowingDetailsPageBreadcrumbs
                movieTitle={movieTitle}
                startTime={showingStartTime}
            />

            <div className="flex justify-between items-center">

                <div>
                    <HeaderTitle>{movieTitle} ({formattedReleaseDate})</HeaderTitle>
                    <HeaderDescription>Showing on {screenName} at {theatreName}.</HeaderDescription>
                </div>

                <ShowingDetailsPageToggles showingSlug={showingSlug} setIsDeleting={setIsDeleting}>
                    <IconButton icon={Ellipsis}/>
                </ShowingDetailsPageToggles>
            </div>
        </header>
    );
}
