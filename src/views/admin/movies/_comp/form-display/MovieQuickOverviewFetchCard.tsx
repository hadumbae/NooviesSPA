/**
 * @file Compact fetch card for basic movie overview.
 * MovieQuickOverviewFetchCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchMovie from "@/domains/movies/_feat/crud-hooks/useFetchMovie.ts";
import {cn} from "@/common/lib/utils.ts";
import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import {Loader} from "lucide-react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieDetails, MovieDetailsSchema} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";

/** Props for MovieQuickOverviewFetchCard. */
type FetchCardProps = {
    /** Target movie identifier. */
    movieID: ObjectId;
    /** Additional class names for layout overrides. */
    className?: string;
};

/** Fetches and renders a compact movie overview. */
export function MovieQuickOverviewFetchCard(
    {movieID, className}: FetchCardProps
): ReactElement {
    const query = useFetchMovie({
        _id: movieID,
        config: {virtuals: true, populate: true},
    });

    return (
        <ValidatedDataLoader query={query} schema={MovieDetailsSchema} loaderComponent={Loader}>
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
                                    src={posterURL}
                                    className="w-16"
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
        </ValidatedDataLoader>
    );
}