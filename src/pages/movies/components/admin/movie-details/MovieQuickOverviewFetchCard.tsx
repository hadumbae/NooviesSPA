import {FC} from "react";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {ObjectId} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import useFetchMovie from "@/pages/movies/hooks/queries/useFetchMovie.ts";
import QueryBoundary from "@/common/components/query/QueryBoundary.tsx";
import ValidatedQueryBoundary from "@/common/components/query/ValidatedQueryBoundary.tsx";
import {MovieDetailsSchema} from "@/pages/movies/schema/movie/Movie.schema.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import {cn} from "@/common/lib/utils.ts";
import formatMovieDetails from "@/pages/movies/utility/formatMovieDetails.ts";
import {Loader} from "lucide-react";
import ErrorMessageDisplay from "@/common/components/errors/ErrorMessageDisplay.tsx";

/**
 * Props for {@link MovieQuickOverviewFetchCard}.
 */
type FetchCardProps = {
    /** Unique movie identifier (MongoDB ObjectId). */
    movieID: ObjectId;

    /** Optional className for extending or overriding layout styles. */
    className?: string;
};

/**
 * A compact card component that fetches and displays basic movie information.
 *
 * @remarks
 * This component handles data retrieval, validation, and presentation in one step.
 * It uses {@link useFetchMovie} to retrieve the movie document from the API, and
 * wraps it with {@link QueryBoundary} and {@link ValidatedQueryBoundary} to manage
 * loading, error, and validation states.
 *
 * The UI displays a movie’s poster, title, genres, and release/runtime details.
 *
 * @param props - {@link FetchCardProps} containing the target `movieID` and optional class name.
 *
 * @example
 * ```tsx
 * <MovieQuickOverviewFetchCard movieID="6709b95e2f2a3f8d7a2b019c" className="mt-3" />
 * ```
 *
 * @see {@link useFetchMovie}
 * @see {@link MovieDetailsSchema}
 */
const MovieQuickOverviewFetchCard: FC<FetchCardProps> = (props) => {
    const {movieID, className} = props;

    const query = useFetchMovie({
        _id: movieID,
        virtuals: true,
        populate: true,
    });

    return (
        <QueryBoundary
            query={query}
            loaderComponent={Loader}
            errorComponent={ErrorMessageDisplay}
        >
            <ValidatedQueryBoundary
                query={query}
                schema={MovieDetailsSchema}
                loaderComponent={Loader}
                errorComponent={ErrorMessageDisplay}
            >
                {(movie: MovieDetails) => {
                    const {title, posterImage} = movie;
                    const {genreString, releaseRuntimeString} = formatMovieDetails(movie);

                    return (
                        <Card>
                            <CardContent className={cn("p-3 flex space-x-2", className)}>
                                <section>
                                    <MoviePosterImage
                                        src={posterImage?.secure_url}
                                        className="w-16"
                                    />
                                </section>

                                <section className="flex-grow flex flex-col justify-center space-y-2">
                                    <h1 className="text-sm font-bold">{title}</h1>
                                    <h2 className="text-xs text-neutral-400">{genreString}</h2>
                                    <h3 className="text-xs text-neutral-400">{releaseRuntimeString}</h3>
                                </section>
                            </CardContent>
                        </Card>
                    );
                }}
            </ValidatedQueryBoundary>
        </QueryBoundary>
    );
};

export default MovieQuickOverviewFetchCard;
