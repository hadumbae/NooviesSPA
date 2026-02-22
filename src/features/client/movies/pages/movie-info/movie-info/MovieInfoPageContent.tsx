/**
 * @file MovieInfoPageContent.tsx
 *
 * @summary
 * Main content layout for the public movie information page.
 *
 * @description
 * Composes the primary informational sections for a movie detail view,
 * including:
 * - Overview header with poster, metadata, and key credits
 * - Editorial information (titles, genres, synopsis, tagline)
 * - Condensed cast & crew information
 * - Navigation link to available showings
 *
 * This component is responsible for layout orchestration only and assumes
 * all required movie and credit data has already been fetched.
 */

import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import MovieInfoOverview from "@/pages/movies/components/client/browse-movies/movie-info/movie-info-overview/MovieInfoOverview.tsx";
import { MovieCreditDetails } from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import MovieEditorialInfoRow
    from "@/pages/movies/components/client/browse-movies/movie-info/movie-editorial-info/MovieEditorialInfoRow.tsx";
import MovieCreditInfoRow
    from "@/pages/movies/components/client/browse-movies/movie-info/movie-credit-info/MovieCreditInfoRow.tsx";

/**
 * Props for {@link MovieInfoPageContent}.
 */
type ContentProps = {
    /**
     * Full movie details to render across all sections.
     */
    movie: MovieDetails;

    /**
     * Movie credit records used for overview and credit sections.
     */
    credits: MovieCreditDetails[];
};

/**
 * Renders the structured content of a movie information page.
 *
 * @remarks
 * - Acts as a composition root for the movie info layout
 * - Does not perform any data fetching
 * - Navigation events are logged via {@link LoggedHoverLink}
 *
 * @param props - Movie and credit data required for rendering
 * @returns Movie information page content
 */
const MovieInfoPageContent = ({ movie, credits }: ContentProps) => {
    const { slug } = movie;

    return (
        <PageFlexWrapper className="space-y-10">
            <MovieInfoOverview movie={movie} credits={credits} />

            <MovieEditorialInfoRow movie={movie} />

            <MovieCreditInfoRow movie={movie} credits={credits} />

            <LoggedHoverLink to={`/browse/movies/${slug}/showings`}>
                Showings
            </LoggedHoverLink>
        </PageFlexWrapper>
    );
};

export default MovieInfoPageContent;

// --- Layout ---

//  - Reviews
//      - Review Carousel
//      - Links

//  - Related
//      - Movies of the same genre (about 10)
//      - Related interests
