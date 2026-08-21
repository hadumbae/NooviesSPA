/**
 * @fileoverview Main page component for the Movie Details view.
 */

import {PageLoader} from "@/views/common/_comp/page";
import {useFetchByIdentifierRouteParams, useSetAdminPageTitle} from "@/common/_feat";
import {SlugRouteParamSchema} from "@/common/_schemas/route/SlugRouteParamSchema.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsPageContent} from "@/views/admin/movies/_pages/details-page/content.tsx";
import {QueryDataLoader} from "@/views/common/_feat";
import {useFetchMovieBySlug} from "@/domains/movies/_feat/crud-hooks";
import {IsDeletingMoviePosterUIContextProvider, IsUpdatingMoviePosterUIContextProvider} from "@/domains/movies/_ctx/ui";
import {IsDeletingUIContextProvider} from "@/common/_ctx/ui";

/**
 * Controller component for the movie profile view that fetches data and provides UI context.
 */
export function MovieDetailsPage() {
    useSetAdminPageTitle({presetTitle: "Movie Details"});

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
        <QueryDataLoader query={query}>
            {(movie: MovieDetails) => (
                <IsDeletingUIContextProvider>
                    <IsUpdatingMoviePosterUIContextProvider>
                        <IsDeletingMoviePosterUIContextProvider>
                            <MovieDetailsPageContent movie={movie}/>
                        </IsDeletingMoviePosterUIContextProvider>
                    </IsUpdatingMoviePosterUIContextProvider>
                </IsDeletingUIContextProvider>
            )}
        </QueryDataLoader>
    );
}