/**
 * @file Compact fetch card for basic movie overview.
 * MovieQuickOverviewFetchCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import {cn} from "@/common/lib/utils.ts";
import formatMovieDetails from "@/pages/movies/utility/formatMovieDetails.ts";
import {Loader} from "lucide-react";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";

/** Props for MovieQuickOverviewFetchCard. */
type FetchCardProps = {
    /** Target movie identifier. */
    movieID: ObjectId;
    /** Additional class names for layout overrides. */
    className?: string;
};

/** Fetches and renders a compact movie overview. */
const MovieQuickOverviewFetchCard = ({movieID, className}: FetchCardProps) => {
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
                } = formatMovieDetails(movie);

                return (
                    <Card>
                        <CardContent className={cn("p-3 flex space-x-2", className)}>
                            <section>
                                <MoviePosterImage
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
};

export default MovieQuickOverviewFetchCard;