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
 * Props for the {@link MovieIndexCard} component.
 *
 * @property movie - The movie details to display in the card.
 * @property className - Optional class name applied to the movie poster image.
 */
type IndexCardProps = {
    movie: MovieDetails;
    className?: string;
}

/**
 * Displays a concise movie card for use in an admin movie index or list view.
 *
 * @remarks
 * This component shows a movie's poster, title, release date, runtime, and genres.
 * It includes a tooltip button that opens a {@link MovieDetailsDialog} containing
 * detailed information about the selected movie.
 *
 * - The title links to the movie's admin page via {@link LoggedLink}.
 * - The card uses {@link formatMovieDetails} to format display strings.
 * - The `TooltipButton` displays a hover tooltip and acts as the trigger for the dialog.
 *
 * @example
 * ```tsx
 * <MovieIndexCard movie={someMovie} />
 * ```
 */
const MovieIndexCard: FC<IndexCardProps> = ({ movie, className }) => {
    const { _id, title } = movie;

    /** Formatted display strings generated from the movie details. */
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
                        className={className}
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
