import {FC} from "react";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieDetailsUIContextProvider from "@/pages/movies/components/providers/MovieDetailsUIContextProvider.tsx";
import MovieDetailsPageContent from "@/pages/movies/pages/admin/movie-details-page/MovieDetailsPageContent.tsx";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import useFetchIDRouteParams from "@/common/hooks/route-params/useFetchIDRouteParams.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";


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
    // --- Title ---

    useTitle("Movie Details");

    // --- Route Params ---

    const {_id: movieID} = useFetchIDRouteParams({
        schema: IDRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    if (!movieID) {
        return <PageLoader/>;
    }

    // --- Query ---

    const query = useFetchMovie({
        _id: movieID,
        populate: true,
        virtuals: true,
    });

    // --- Render ---

    return (
        <MovieDetailsUIContextProvider>
            <QueryBoundary query={query}>
                <ValidatedQueryBoundary query={query} schema={MovieDetailsSchema}>
                    {(movie: MovieDetails) => {
                        const {refetch} = query;

                        return (
                            <MovieDetailsPageContent
                                movie={movie}
                                refetchMovie={refetch}
                            />
                        );
                    }}
                </ValidatedQueryBoundary>
            </QueryBoundary>
        </MovieDetailsUIContextProvider>
    );
};

export default MovieDetailsPage;
