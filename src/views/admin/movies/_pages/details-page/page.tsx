/**
 * @fileoverview Main page component for the Movie Details view.
 *
 */
import {PageLoader} from "@/views/common/_comp/page";
import useTitle from "@/common/hooks/document/useTitle.ts";
import useFetchByIdentifierRouteParams from "@/common/hooks/route-params/useFetchByIdentifierRouteParams.ts";
import {SlugRouteParamSchema} from "@/common/schema/route-params/SlugRouteParamSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageContent} from "@/views/admin/movies/_pages/details-page/content.tsx";
import {MovieDetailsUIContextProvider} from "@/domains/movies/context/details-ui/MovieDetailsUIContextProvider.tsx";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";

/**
 * Controller component for the movie profile view that fetches data and provides UI context.
 */
export function MovieDetailsPage() {
    useTitle("Movie Details");

    const {slug} = useFetchByIdentifierRouteParams({
        schema: SlugRouteParamSchema,
        errorTo: "/admin/movies",
    }) ?? {};

    const query = useFetchMovieBySlug({
        slug: slug!,
        schema: MovieDetailsSchema,
        config: {populate: true, virtuals: true},
        options: {enabled: !!slug}
    });

    if (!slug) {
        return <PageLoader/>;
    }

    return (
        <MovieDetailsUIContextProvider>
            <QueryDataLoader query={query}>
                {(movie: MovieDetails) => <MovieDetailsPageContent movie={movie}/>}
            </QueryDataLoader>
        </MovieDetailsUIContextProvider>
    );
}