/**
 * @fileoverview Page component for managing movie credits filtered by department.
 */

import {ReactElement} from "react";
import {PageLoader} from "@/views/common/_comp/page";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {QueryDataLoader} from "@/views/common/_feat/loaders/QueryDataLoader.tsx";
import useParsedPaginationValue from "@/common/_feat/fetch-pagination-search-params/hooks/useParsedPaginationValue.ts";
import {MoviePeoplePageContent} from "@/views/admin/movies/_pages/people-page/content.tsx";

import {RoleTypeDepartment} from "@/domains/roletypes";
import {Movie, MovieSchema, useFetchMovieBySlug} from "@/domains/movies";

/** Props for the MoviePeoplePage component. */
type PeoplePageProps = {
    department: RoleTypeDepartment;
};

const CREDITS_PER_PAGE = 20;

/** Controller component that validates the movie slug and initiates the data fetching sequence for movie credits. */
export function MoviePeoplePage(
    {department}: PeoplePageProps
): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
        sourceComponent: MoviePeoplePage.name,
    }) ?? {};

    const {value: page, setValue: setPage} = useParsedPaginationValue("page", 1);

    const query = useFetchMovieBySlug({
        schema: MovieSchema,
        slug: slug!,
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <QueryDataLoader query={query}>
            {(movie: Movie) => (
                <MoviePeoplePageContent
                    page={page}
                    perPage={CREDITS_PER_PAGE}
                    setPage={setPage}
                    movie={movie}
                    department={department}
                />
            )}
        </QueryDataLoader>
    );
}