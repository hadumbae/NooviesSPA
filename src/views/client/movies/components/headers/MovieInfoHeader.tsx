/**
 * @file Header component for movie information pages.
 * @filename MovieInfoHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";

/**
 * Component props.
 */
type MovieInfoHeaderProps = {
    /** Poster image URL */
    posterURL?: URLString;

    /** Movie slug used for navigation */
    movieSlug: string;

    /** Movie title displayed in the header */
    movieTitle: string;

    /** Page title displayed below the movie title */
    pageText: string;
};

/**
 * Displays a movie context header with poster and page title.
 */
const MovieInfoHeader = (
    {movieSlug, movieTitle, posterURL, pageText}: MovieInfoHeaderProps
) => {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <MoviePosterImage src={posterURL} className="h-28"/>
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
};

export default MovieInfoHeader;