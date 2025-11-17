import {FC} from 'react';
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import useFetchRouteParams from "@/common/hooks/router/useFetchRouteParams.ts";
import {IDRouteParamSchema} from "@/common/schema/route-params/IDRouteParamSchema.ts";
import useErrorNavigateToMovieIndex from "@/pages/movies/hooks/admin/navigate-to-index/useErrorNavigateToMovieIndex.ts";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import MovieEditPageContent from "@/pages/movies/pages/admin/movie-edit-page/MovieEditPageContent.tsx";

/**
 * Admin page component for editing an existing movie.
 *
 * This component is responsible for orchestrating the full data-loading
 * and validation flow before rendering the movie edit UI.
 *
 * ## Responsibilities
 * - **Route Parameter Handling**
 *   Retrieves the `_id` parameter from the URL using {@link useFetchRouteParams},
 *   validating it against {@link IDRouteParamSchema}.
 *   On failure, it navigates to the movie index page using
 *   {@link useErrorNavigateToMovieIndex}, with contextual logging.
 *
 * - **Movie Fetching**
 *   Fetches movie data through {@link useFetchMovie}. The component supports
 *   loading and error states via {@link QueryBoundary}.
 *
 * - **Schema Validation**
 *   Ensures the loaded movie data conforms to {@link MovieSchema} using
 *   {@link ValidatedQueryBoundary} before rendering child content.
 *
 * - **Rendering**
 *   Once fully validated, renders {@link MovieEditPageContent} with the loaded
 *   {@link Movie} object.
 *
 * ## Behavior
 * - Displays a {@link PageLoader} while waiting for valid route parameters.
 * - Automatically handles invalid or unreadable route parameters by navigating
 *   to the movie index and logging the failure.
 * - Ensures that only valid, schema-conforming movie data reaches the edit page.
 *
 * @example
 * ```tsx
 * <MovieEditPage />
 * ```
 */
const MovieEditPage: FC = () => {
    // ⚡ Route Params ⚡

    const navigateOnError = useErrorNavigateToMovieIndex();

    const routeParams = useFetchRouteParams({
        schema: IDRouteParamSchema,
        onErrorMessage: "Failed to fetch route params.",
        onError: () => navigateOnError({
            component: MovieEditPage.name,
            message: "Failed to fetch route params.",
        }),
    });

    if (!routeParams) {
        return <PageLoader/>;
    }

    const {_id} = routeParams;

    // ⚡ Query ⚡

    const query = useFetchMovie({_id, populate: false, virtuals: false});

    // ⚡ Render ⚡

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieSchema}>
                {(movie: Movie) => <MovieEditPageContent movie={movie}/>}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieEditPage;
