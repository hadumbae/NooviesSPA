import {FC} from "react";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MovieDetailsUIContextProvider from "@/pages/movies/components/providers/MovieDetailsUIContextProvider.tsx";
import MovieDetailsPageContent from "@/features/admin/movies/details-page/MovieDetailsPageContent.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

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
    useTitle("Movie Details");

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const query = useFetchMovieBySlug({
        slug,
        config: {populate: true, virtuals: true},
    });

    return (
        <MovieDetailsUIContextProvider>
            <ValidatedDataLoader query={query} schema={MovieDetailsSchema}>
                {(movie: MovieDetails) => {
                    const {refetch} = query;

                    return (
                        <MovieDetailsPageContent movie={movie} refetchMovie={refetch}/>
                    );
                }}
            </ValidatedDataLoader>
        </MovieDetailsUIContextProvider>
    );
};

export default MovieDetailsPage;
