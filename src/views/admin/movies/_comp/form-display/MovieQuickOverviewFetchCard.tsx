/**
 * @fileoverview Compact fetch card for displaying a basic movie overview.
 */

import {ReactElement} from "react";
import {ObjectId} from "@/common/_schemas";
import {cn} from "@/common/_feat";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {QueryDataLoader} from "@/views/common/_feat";
import {Card, CardContent} from "@/views/common/_comp/ui";
import {formatMovieData, MovieDetails, MovieDetailsSchema, useFetchMovie} from "@/domains/movies";

/** Props for the MovieQuickOverviewFetchCard component. */
type FetchCardProps = {
    movieID: ObjectId;
    className?: string;
};

/** Fetches and renders a compact card containing movie details and a poster. */
export function MovieQuickOverviewFetchCard(
    {movieID, className}: FetchCardProps
): ReactElement {
    const query = useFetchMovie({
        _id: movieID,
        schema: MovieDetailsSchema,
        config: {virtuals: true, populate: true},
    });

    return (
        <QueryDataLoader query={query}>
            {(movie: MovieDetails) => {
                const {title, formatted: {genreList, yearAndDuration, posterURL}} = formatMovieData(movie);

                return (
                    <Card>
                        <CardContent className={cn("p-3 flex space-x-2", className)}>
                            <MoviePosterImageDialog url={posterURL} className="w-16 aspect-[2/3]"/>

                            <div className="flex-grow flex flex-col justify-center space-y-2">
                                <h1 className="text-sm font-bold">{title}</h1>
                                <h2 className="text-xs text-neutral-400">{genreList}</h2>
                                <h3 className="text-xs text-neutral-400">{yearAndDuration}</h3>
                            </div>
                        </CardContent>
                    </Card>
                );
            }}
        </QueryDataLoader>
    );
}