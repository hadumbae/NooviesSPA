import {FC} from 'react';
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/domains/movies/hooks/queries/useFetchMovieBySlug.ts";
import MoviePeoplePageContent from "@/views/admin/movies/pages/credits-page/MoviePeoplePageContent.tsx";
import useParsedPaginationValue from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";

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
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        sourceComponent: MoviePeoplePage.name,
    }) ?? {};

    if (!slug) {
        return <PageLoader/>;
    }

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);
    const query = useFetchMovieBySlug({slug});

    return (
        <ValidatedDataLoader query={query} schema={MovieSchema}>
            {(movie: Movie) => (
                <MoviePeoplePageContent
                    page={page}
                    perPage={CREDITS_PER_PAGE}
                    setPage={setPage}
                    movie={movie}
                    department={department}
                />
            )}
        </ValidatedDataLoader>
    );
};

export default MoviePeoplePage;
