/**
 * @fileoverview Header component for the Movie Reviews page.
 */

import {ReactElement} from "react";
import {URLString} from "@/common/_schemas/strings/simple-strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp";
import {HeaderDescription, HeaderTitle} from "@/views/common/_comp/page-headers";

/** Props for the MovieInfoReviewsPageHeader component. */
type HeaderProps = {
    posterURL?: URLString;
    movieSlug: string;
    movieTitle: string;
};

/** Renders the header section for the Movie Info Reviews page. */
export function MovieInfoReviewsPageHeader(
    {movieSlug, movieTitle, posterURL}: HeaderProps
): ReactElement {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <MoviePosterImage url={posterURL} className="h-28"/>
            </LoggedLink>

            <div className="space-y-1 py-3">
                <HeaderDescription className="text-sm">{movieTitle}</HeaderDescription>
                <HeaderTitle className="text-2xl">Movie Reviews</HeaderTitle>
            </div>
        </header>
    );
}