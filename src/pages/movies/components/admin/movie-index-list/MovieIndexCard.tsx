import { FC } from 'react';
import { Card, CardContent } from "@/common/components/ui/card.tsx";
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import { Info } from "lucide-react";
import TooltipButton from "@/common/components/buttons/TooltipButton.tsx";
import MovieDetailsDialog from "@/pages/movies/components/admin/movie-index-list/MovieDetailsDialog.tsx";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import formatMovieDetails from "@/pages/movies/utility/formatMovieDetails.ts";
import LoggedLink from "@/common/components/navigation/LoggedLink.tsx";

/**
 * Props for the `MovieIndexCard` component.
 */
type IndexCardProps = {
    /** The movie details to display in the card. */
    movie: MovieDetails;
}

/**
 * A card component that displays a movie's poster, title, runtime, genres, and a tooltip button for more information.
 *
 * @remarks
 * The card integrates with `MovieDetailsDialog` to show a modal with detailed movie information.
 * The title links to the admin page for the movie, and a `TooltipButton` displays a hover tooltip.
 *
 * @param props - The props object.
 * @param props.movie - The movie details to render in the card.
 *
 * @example
 * ```tsx
 * <MovieIndexCard movie={someMovie} />
 * ```
 */
const MovieIndexCard: FC<IndexCardProps> = ({ movie }) => {
    const { _id, title } = movie;

    /** Formatted movie details for display in the card. */
    const { posterURL, genreString, releaseRuntimeString } = formatMovieDetails(movie);

    /** Tooltip text for the info button. */
    const tooltipText = "More Information For Movie";

    return (
        <Card>
            <CardContent className="p-4 flex items-center space-x-2">
                {/* Movie poster */}
                <section>
                    <MoviePosterImage
                        src={posterURL}
                        className="w-16"
                    />
                </section>

                {/* Title, runtime, and genres */}
                <section className="flex-grow flex flex-col space-y-1">
                    <LoggedLink
                        to={`/admin/movies/get/${_id}`}
                        className="hover:underline hover:underline-offset-4"
                    >
                        <h1 className="text-lg font-bold">{title}</h1>
                    </LoggedLink>

                    <h2 className="text-sm text-neutral-400">{releaseRuntimeString}</h2>
                    <h3 className="text-xs text-neutral-400">{genreString}</h3>
                </section>

                {/* Tooltip info button triggering movie details dialog */}
                <MovieDetailsDialog movie={movie}>
                    <TooltipButton
                        tooltipText={tooltipText}
                        variant="link"
                        className="text-neutral-400 hover:text-black"
                    >
                        <Info />
                    </TooltipButton>
                </MovieDetailsDialog>
            </CardContent>
        </Card>
    );
};

export default MovieIndexCard;
