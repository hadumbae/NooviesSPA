/**
 * @fileoverview Main page component for managing movie credits (people) by department.
 * Orchestrates route parameter extraction, slug-based movie fetching, and
 * view state management.
 */

import {ReactElement} from "react";
import PageLoader from "@/common/components/page/PageLoader.tsx";
import {RoleTypeDepartment} from "@/domains/roletype/schema/RoleTypeDepartmentEnumSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/domains/movies/hooks/queries/useFetchMovieBySlug.ts";
import useParsedPaginationValue
    from "@/common/features/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MoviePeoplePageContent} from "@/views/admin/movies/people-page/content.tsx";

type PeoplePageProps = {
    department: RoleTypeDepartment;
};

const CREDITS_PER_PAGE = 20;

/**
 * Controller component that validates the movie slug from the URL and initiates
 * the data fetching sequence for the movie profile.
 */
export function MoviePeoplePage(
    {department}: PeoplePageProps
): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        sourceComponent: MoviePeoplePage.name,
    }) ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieBySlug({slug: slug!, options: {enabled: !!slug}});

    if (!slug) {
        return <PageLoader/>;
    }

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
}