/**
 * @fileoverview Presentation component for the Movie Details page.
 */

import {ReactElement} from 'react';
import {PageFlexWrapper} from "@/views/common/_comp/page";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieDetailsHeader} from "@/views/admin/movies/details-page/sections/header.tsx";
import {MovieDetailsCard} from "@/views/admin/movies/_comp/details-display";
import {MovieDetailsPageActions} from "@/views/admin/movies/details-page/sections/actions.tsx";
import {SROnly} from "@/views/common/_comp/screen-readers";
import {MovieDetailsPageCreditSection} from "@/views/admin/movies/details-page/sections/creditSection.tsx";
import {MovieDetailsPageShowingSection} from "@/views/admin/movies/details-page/sections/showingSection.tsx";

export type MovieDetailsPageContentProps = {
    movie: MovieDetails;
};

/**
 * Renders the primary administrative view for a specific movie.
 */
export function MovieDetailsPageContent(
    {movie}: MovieDetailsPageContentProps
): ReactElement {
    const {_id, slug} = movie;

    return (
        <PageFlexWrapper>
            <MovieDetailsHeader movie={movie}/>

            <section className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div>
                    <SROnly text="Details & Credits"/>
                    <MovieDetailsCard movie={movie}/>
                </div>

                <div className="2xl:col-span-2 space-y-4">
                    <MovieDetailsPageCreditSection _id={_id} slug={slug}/>
                    <MovieDetailsPageShowingSection _id={_id}/>
                </div>
            </section>

            <MovieDetailsPageActions
                movieID={_id}
                className="hidden"
            />
        </PageFlexWrapper>
    );
}