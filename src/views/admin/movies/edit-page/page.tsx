/**
 * @fileoverview Main page component for the movie editing interface in the admin dashboard.
 *
 */

import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieEditPageContent} from "@/views/admin/movies/edit-page/content.tsx";
import {PageLoader} from "@/views/common/_comp/page";
import {ReactElement} from "react";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";

/**
 * Controller component that fetches movie data by slug for the edit view.
 */
export function MovieEditPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {}

    const query = useFetchMovieBySlug({
        slug: slug!,
        schema: MovieSchema,
        config: {populate: false, virtuals: false},
        options: {enabled: !!slug},
    });

    if (!slug) {
        return <PageLoader/>
    }

    return (
        <QueryDataLoader query={query}>
            {(movie: Movie) => <MovieEditPageContent movie={movie}/>}
        </QueryDataLoader>
    )
}