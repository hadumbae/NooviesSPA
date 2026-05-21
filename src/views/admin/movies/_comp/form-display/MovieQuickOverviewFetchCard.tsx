/**
 * @fileoverview Compact fetch card for displaying a basic movie overview.
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";
import {formatMovieData} from "@/domains/movies/_feat/formatters";
import {QueryDataLoader} from "@/common/components/query/loaders/QueryDataLoader.tsx";
import {useFetchMovie} from "@/domains/movies/_feat/crud-hooks";

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
        config: {virtuals: true, populate: true},
        schema: MovieDetailsSchema
    });

    return (
        <QueryDataLoader query={query}>
            {(movie: MovieDetails) => {
                const {
                    title,
                    formatted: {genreList, yearAndDuration, posterURL},
                } = formatMovieData(movie);

                return (
                    <Card>
                        <CardContent className={cn("p-3 flex space-x-2", className)}>
                            <section>
                                <MoviePosterImageDialog
                                    url={posterURL}
                                    className="w-16 aspect-[2/3]"
                                />
                            </section>

                            <section className="flex-grow flex flex-col justify-center space-y-2">
                                <h1 className="text-sm font-bold">{title}</h1>
                                <h2 className="text-xs text-neutral-400">{genreList}</h2>
                                <h3 className="text-xs text-neutral-400">{yearAndDuration}</h3>
                            </section>
                        </CardContent>
                    </Card>
                );
            }}
        </QueryDataLoader>
    );
}