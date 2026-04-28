/**
 * @fileoverview Main page component for the movie editing interface.
 * Handles slug extraction from route parameters and initiates the
 * data fetching process for the movie record.
 */

import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import useFetchMovieBySlug from "@/domains/movies/_feat/crud-hooks/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {Movie, MovieSchema} from "@/domains/movies/schema/movie/MovieSchema.ts";
import {MovieEditPageContent} from "@/views/admin/movies/edit-page/content.tsx";
import {PageLoader} from "@/views/common/_comp/page";
import {ReactElement} from "react";

/**
 * Controller component for the movie edit view.
 */
export function MovieEditPage(): ReactElement {
    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {}

    /** Render a loader if the route parameters are still being resolved. */
    if (!slug) {
        return <PageLoader />
    }

    const query = useFetchMovieBySlug({
        slug,
        config: {populate: false, virtuals: false},
    })

    return (
        <ValidatedDataLoader query={query} schema={MovieSchema}>
            {(movie: Movie) => <MovieEditPageContent movie={movie} />}
        </ValidatedDataLoader>
    )
}