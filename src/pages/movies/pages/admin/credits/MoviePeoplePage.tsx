import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {RoleTypeDepartment} from "@/pages/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import {Movie} from "@/pages/movies/schema/movie/Movie.types.ts";
import {MovieSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/pages/movies/hooks/queries/useFetchMovieBySlug.ts";
import MoviePeoplePageContent from "@/pages/movies/pages/admin/credits/MoviePeoplePageContent.tsx";
import useParsedPaginationValue from "@/common/hooks/search-params/useParsedPaginationValue.ts";

/**
 * Props for {@link MoviePeoplePage}.
 */
type PeoplePageProps = {
    /** Credit department to manage (CAST or CREW) */
    department: RoleTypeDepartment;
};

const CREDITS_PER_PAGE = 20;

/**
 * Admin movie people page.
 *
 * Resolves route params, fetches the movie,
 * and renders paginated CAST or CREW credits.
 */
const MoviePeoplePage: FC<PeoplePageProps> = ({department}) => {
    // --- ROUTE PARAMS ---
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        sourceComponent: MoviePeoplePage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    // --- PAGINATION ---
    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    // --- QUERY ---
    const query = useFetchMovieBySlug({slug});

    // --- RENDER ---
    return (
        <QueryBoundary query={query}>
            <ValidatedQueryBoundary query={query} schema={MovieSchema}>
                {(movie: Movie) => (
                    <MoviePeoplePageContent
                        page={page}
                        perPage={CREDITS_PER_PAGE}
                        setPage={setPage}
                        movie={movie}
                        department={department}
                    />
                )}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MoviePeoplePage;
