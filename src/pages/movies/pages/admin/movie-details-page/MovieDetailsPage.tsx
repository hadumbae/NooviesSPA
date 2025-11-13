import {FC} from "react";
import useFetchMovieParams from "@/pages/movies/hooks/params/useFetchMovieParams.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import CombinedQueryBoundary from "@/common/components/query/combined/CombinedQueryBoundary.tsx";
import CombinedValidatedQueryBoundary from "@/common/components/query/combined/CombinedValidatedQueryBoundary.tsx";
import {CombinedSchemaQuery} from "@/common/components/query/combined/CombinedValidatedQueryBoundary.types.ts";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {MovieCreditDetailsArray} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.types.ts";
import MovieDetailsUIContextProvider from "@/pages/movies/components/providers/MovieDetailsUIContextProvider.tsx";
import MovieDetailsPageContent from "@/pages/movies/pages/admin/movie-details-page/MovieDetailsPageContent.tsx";

/**
 * Represents detailed movie data along with its associated credits.
 */
type MovieWithData = {
    /** The validated and fetched detailed movie entity. */
    movie: MovieDetails;

    /** List of validated credit entries (cast and/or crew) associated with the movie. */
    credits: MovieCreditDetailsArray;
};

/**
 * Renders the **Movie Details Page**, showing complete information about a specific movie,
 * including its metadata, poster, and top-billed cast/crew.
 *
 * @remarks
 * This component:
 * - Dynamically sets the document title to `"Movie Details"`.
 * - Extracts the movie ID from URL parameters via `useFetchMovieParams`.
 * - Fetches:
 *   - Movie details (`useFetchMovie`) with populated references.
 *   - Movie credits (`useFetchMovieCredits`) for the first six billed cast members.
 * - Combines both queries with `CombinedQueryBoundary` and validates them using
 *   `CombinedValidatedQueryBoundary` against `MovieDetailsSchema` and `MovieCreditDetailsArraySchema`.
 * - On success, simplifies movie data for header display and renders:
 *   - `MovieDetailsBreadcrumb` navigation,
 *   - `MovieDetailsHeader` (title, release info, etc.),
 *   - `MovieDetailsCard` (core metadata),
 *   - `MovieDetailsCreditOverview` (cast list preview).
 * - Also contains hidden form sections and dialogs for editing, updating, or deleting
 *   movie and poster data via contextual UI controls.
 *
 * @component
 * @example
 * ```tsx
 * <MovieDetailsPage />
 * ```
 */
const MovieDetailsPage: FC = () => {
    // ⚡ Document ⚡

    useTitle("Movie Details");

    // ⚡ URL Params ⚡

    const movieParams = useFetchMovieParams();
    if (!movieParams) return <PageLoader/>;
    const {movieID} = movieParams;

    // ⚡ Queries ⚡

    const movieQuery = useFetchMovie({_id: movieID, populate: true, virtuals: true});
    const creditQuery = useFetchMovieCredits({
        movie: movieID,
        populate: true,
        virtuals: true,
        limit: 6,
        department: "CAST",
        sortByBillingOrder: "asc",
    });

    const queries = [movieQuery, creditQuery];

    // ⚡ Validation ⚡

    const validationQueries: CombinedSchemaQuery[] = [
        {query: movieQuery, key: "movie", schema: MovieDetailsSchema},
        {query: creditQuery, key: "credits", schema: MovieCreditDetailsArraySchema},
    ];

    return (
        <MovieDetailsUIContextProvider>
            <CombinedQueryBoundary queries={queries}>
                <CombinedValidatedQueryBoundary queries={validationQueries}>
                    {(data) => {
                        const {refetch} = movieQuery;
                        const {movie, credits} = data as MovieWithData;

                        return (
                            <MovieDetailsPageContent
                                movie={movie}
                                credits={credits}
                                refetchMovie={refetch}
                            />
                        );
                    }}
                </CombinedValidatedQueryBoundary>
            </CombinedQueryBoundary>
        </MovieDetailsUIContextProvider>
    );
};

export default MovieDetailsPage;
