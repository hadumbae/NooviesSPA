/**
 * @fileoverview Movie overview header section combining headline, poster, metadata, and credit links.
 */

import {ReactElement} from "react";
import {
    MovieOverviewHeadline
} from "@/views/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewHeadline.tsx";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {
    MovieOverviewMeta
} from "@/views/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewMeta.tsx";
import {
    MovieOverviewCreditLinks
} from "@/views/client/movies/pages/movie-info/rows/movie-info-overview/MovieOverviewCreditLinks.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {MovieCreditDetails} from "@/domains/moviecredit/schemas";

/** Props for the MovieOverviewHeader component. */
type OverviewProps = {
    movie: MovieDetails;
    credits: MovieCreditDetails[];
};

/**
 * Renders the movie overview header layout including the poster and metadata.
 */
export function MovieOverviewHeader({movie, credits}: OverviewProps): ReactElement {
    const {posterImage} = movie;

    return (
        <div className="space-y-3">
            <MovieOverviewHeadline movie={movie}/>

            <Card>
                <CardContent className="p-0">
                    <div className="grid lg:grid-rows-[2fr_1fr] grid-cols-3 lg:max-h-[400px]">
                        <section className="lg:row-span-2 flex justify-center items-center p-2">
                            <MoviePosterImageDialog url={posterImage?.secure_url} className="max-lg:w-full lg:h-[350px]"/>
                        </section>

                        <section className="col-span-2 px-3 py-3">
                            <MovieOverviewMeta className="space-y-4" movie={movie}/>
                        </section>

                        <section className="max-lg:col-span-3 lg:col-span-2 px-3 py-3">
                            <MovieOverviewCreditLinks credits={credits}/>
                        </section>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

