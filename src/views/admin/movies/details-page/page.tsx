/**
 * @fileoverview Main page component for the Movie Details view.
 * Orchestrates route parameter extraction, movie data fetching with full
 * population, and wraps the view in a specialized UI context for
 * administrative actions.
 */

import PageLoader from "@/views/common/_comp/page/PageLoader.tsx";
import useTitle from "@/common/hooks/document/useTitle.ts";
import MovieDetailsUIContextProvider from "@/domains/movies/components/providers/MovieDetailsUIContextProvider.tsx";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import useFetchMovieBySlug from "@/domains/movies/hooks/queries/useFetchMovieBySlug.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageContent} from "@/views/admin/movies/details-page/content.tsx";

/**
 * Controller component for the movie profile view.
 */
export function MovieDetailsPage() {
    useTitle("Movie Details");

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    const query = useFetchMovieBySlug({
        slug: slug!,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug}
    });

    if (!slug) {
        return <PageLoader />;
    }

    return (
        <MovieDetailsUIContextProvider>
            <ValidatedDataLoader query={query} schema={MovieDetailsSchema}>
                {(movie: MovieDetails) => {
                    const {refetch} = query;

                    return (
                        <MovieDetailsPageContent
                            movie={movie}
                            refetchMovie={refetch}
                        />
                    );
                }}
            </ValidatedDataLoader>
        </MovieDetailsUIContextProvider>
    );
}