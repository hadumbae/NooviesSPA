/**
 * @fileoverview Movie overview header section combining headline, poster, metadata, and credit links.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/views/common/_comp/ui/card.tsx";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {MovieOverviewCreditLinks, MovieOverviewHeadline, MovieOverviewMeta} from "@/views/client/movies/_comp";

import {MovieDetails} from "@/domains/movies";
import {MovieCreditDetails} from "@/domains/movie-credits";

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
                            <MoviePosterImageDialog
                                url={posterImage?.secure_url}
                                className="max-lg:w-full lg:h-[350px] aspect-[2/3]"
                            />
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

