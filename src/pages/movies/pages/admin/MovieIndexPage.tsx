import {FC} from 'react';
import PageFlexWrapper from "@/common/components/page/PageFlexWrapper.tsx";
import MovieIndexHeader from "@/pages/movies/components/headers/MovieIndexHeader.tsx";
import usePaginationSearchParams from "@/common/hooks/params/usePaginationSearchParams.ts";
import PageSection from "@/common/components/page/PageSection.tsx";
import PageCenter from "@/common/components/page/PageCenter.tsx";
import {Movie} from "@/pages/movies/schema/model/MovieSchema.ts";
import MovieIndexCard from "@/pages/movies/components/list/MovieIndexCard.tsx";
import {PaginatedMovies, PaginatedMovieSchema} from "@/pages/movies/schema/model/pagination/MoviePaginationSchema.ts";
import useFetchMovies from "@/pages/movies/hooks/queries/useFetchMovies.ts";
import usePaginationLocationState from "@/common/hooks/params/usePaginationLocationState.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";

/**
 * `MovieIndexPage` displays a paginated list of movies
 * within the admin dashboard.
 *
 * @remarks
 * This page:
 * - Reads pagination state from either the URL query parameters or
 *   navigation state (via `usePaginationLocationState`).
 * - Fetches paginated movie data using `useFetchMovies`.
 * - Uses `QueryBoundary` to handle loading and error states,
 *   and `ValidatedQueryBoundary` to ensure the fetched data
 *   matches the `PaginatedMovieSchema`.
 * - Renders a `MovieIndexHeader` with a "Create" button
 *   that preserves pagination state when navigating to the create page.
 * - Shows a movie list (`MovieIndexCard` for each item)
 *   or an empty state message if no movies exist.
 *
 * @example
 * ```tsx
 * <MovieIndexPage />
 * ```
 *
 * @component
 * @returns {JSX.Element} The movie index page UI.
 */
const MovieIndexPage: FC = () => {
    const {data: paginationState} = usePaginationLocationState();
    const {page, perPage} = usePaginationSearchParams(paginationState ?? {page: 1, perPage: 25});

    const query = useFetchMovies({populate: true, paginated: true, page, perPage});

    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={PaginatedMovieSchema}>
                {(paginatedMovies: PaginatedMovies) => {
                    const {items: movies} = paginatedMovies;
                    const hasMovies = (movies || []).length > 0;

                    const movieSection = (
                        <PageSection srTitle="List Of Movies" className="space-y-3">
                            {movies.map((movie: Movie) => <MovieIndexCard movie={movie} key={movie._id}/>)}
                        </PageSection>
                    );

                    const emptySection = (
                        <PageCenter>
                            <span className="text-neutral-400 select-none">There Are No Movies</span>
                        </PageCenter>
                    );

                    return (
                        <PageFlexWrapper>
                            <MovieIndexHeader/>
                            {hasMovies ? movieSection : emptySection}
                        </PageFlexWrapper>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieIndexPage;
