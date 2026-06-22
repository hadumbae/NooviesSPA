/**
 * @fileoverview Header component for movie information pages.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";

/** Props for the MovieInfoHeader component. */
type MovieInfoHeaderProps = {
    posterURL?: URLString;
    movieSlug: string;
    movieTitle: string;
    pageText: string;
};

/** Displays a movie context header with a poster, title, and page-specific text. */
export function MovieInfoHeader(
    {movieSlug, movieTitle, posterURL, pageText}: MovieInfoHeaderProps
): ReactElement {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <MoviePosterImage url={posterURL} className="h-28 aspect-[2/3]"/>
            </LoggedLink>

            <div className="space-y-1 py-3">
                <LoggedLink to={`/browse/movies/${movieSlug}`}>
                    <HeaderDescription className="text-sm hover:underline hover:underline-offset-4">
                        {movieTitle}
                    </HeaderDescription>
                </LoggedLink>

                <HeaderTitle className="text-2xl">{pageText}</HeaderTitle>
            </div>
        </header>
    );
}
