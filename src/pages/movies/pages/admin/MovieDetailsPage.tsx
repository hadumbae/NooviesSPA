import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieDetailsHeader from "@/pages/movies/components/headers/MovieDetailsHeader.tsx";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import MovieDetailsCard from "@/pages/movies/components/details/MovieDetailsCard.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MovieDetailsBreadcrumb from "@/pages/movies/components/breadcrumbs/admin/MovieDetailsBreadcrumb.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import simplifyMovieDetails from "@/pages/movies/utility/simplifyMovieDetails.ts";

/**
 * Page component that renders detailed information about a specific movie.
 *
 * This component:
 * - Sets the document title to "Movie Details".
 * - Fetches movie ID from URL parameters via `useFetchMovieParams`.
 * - Loads movie data using `useFetchMovie` query hook.
 * - Handles loading states with `PageLoader`.
 * - Validates fetched movie data against `MovieDetailsSchema`.
 * - Displays breadcrumb navigation, header, and detailed movie card.
 *
 * It also simplifies movie details for the header using `simplifyMovieDetails`.
 *
 * @example
 * ```tsx
 * <MovieDetailsPage />
 * ```
 */
const MovieDetailsPage: FC = () => {
    // Set the document title for the page
    useTitle("Movie Details");

    // Fetch movie parameters from URL (e.g., movie ID)
    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader />;

    const { movieID } = movieParams;

    // Fetch movie data, including populated references and virtual fields
    const query = useFetchMovie({ _id: movieID, populate: true, virtuals: true });

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieDetailsSchema}>
                {(movie: MovieDetails) => {
                    const simplifiedMovie = simplifyMovieDetails(movie);

                    return (
                        <PageFlexWrapper>
                            <section>
                                <h1 className="sr-only">Movie Details Header</h1>
                                <MovieDetailsBreadcrumb />
                                <MovieDetailsHeader movie={simplifiedMovie} />
                            </section>

                            <section>
                                <h1 className="sr-only">Movie Details Card</h1>
                                <MovieDetailsCard movie={movie} />
                            </section>

                            <section>
                                Movie Credit
                            </section>
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieDetailsPage;