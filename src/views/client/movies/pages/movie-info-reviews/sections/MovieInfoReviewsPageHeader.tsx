/**
 * @file Header component for the Movie Reviews page.
 *
 * MovieInfoReviewsPageHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import HeaderDescription from "@/common/components/page/headers/HeaderDescription.tsx";
import {URLString} from "@/common/schema/strings/URLStringSchema.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";

/**
 * Props for MovieInfoReviewsPageHeader.
 */
type HeaderProps = {
    /**
     * Optional poster image URL for the movie.
     */
    posterURL?: URLString;

    /**
     * Slug identifier for the movie.
     * Used to navigate back to the movie detail page.
     */
    movieSlug: string;

    /**
     * Display title of the movie.
     */
    movieTitle: string;
};

/**
 * Renders the header section for the Movie Info Reviews page.
 */
const MovieInfoReviewsPageHeader = (
    {movieSlug, movieTitle, posterURL}: HeaderProps
) => {
    return (
        <header className="flex space-x-4 items-end">
            <LoggedLink to={`/browse/movies/${movieSlug}`}>
                <MoviePosterImage src={posterURL} className="h-28"/>
            </LoggedLink>

            <div className="space-y-1 py-3">
                <HeaderDescription className="text-sm">{movieTitle}</HeaderDescription>
                <HeaderTitle className="text-2xl">Movie Reviews</HeaderTitle>
            </div>
        </header>
    );
};

export default MovieInfoReviewsPageHeader;