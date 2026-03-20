/**
 * @file Compact movie index card component.
 * MovieIndexCard.tsx
 */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import TooltipButton from "@/common/components/buttons/TooltipButton.tsx";
import MovieDetailsDialog from "@/domains/movies/components/admin/movie-index-list/MovieDetailsDialog.tsx";
import MoviePosterImage from "@/domains/movies/components/MoviePosterImage.tsx";
import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

/** Props for MovieIndexCard. */
type IndexCardProps = {
    /** Source movie details. */
    movie: MovieDetails;
    /** Additional class names for the poster image. */
    className?: string;
}

/** Renders a concise movie overview for index listings. */
const MovieIndexCard = ({movie, className}: IndexCardProps) => {
    const {
        slug,
        title,
        formatted: {posterURL, genreList, yearAndDuration},
    } = formatMovieData(movie);

    return (
        <Card>
            <CardContent className="p-4 flex items-center space-x-2">
                <section>
                    <MoviePosterImage
                        src={posterURL}
                        className={className}
                    />
                </section>

                <section className="flex-grow flex flex-col space-y-1">
                    <LoggedHoverLink to={`/admin/movies/get/${slug}`}>
                        <h1 className="text-lg font-bold">{title}</h1>
                    </LoggedHoverLink>

                    <h2 className="text-sm text-neutral-400">{yearAndDuration}</h2>
                    <h3 className="text-xs text-neutral-400">{genreList}</h3>
                </section>

                <MovieDetailsDialog movie={movie}>
                    <TooltipButton
                        variant="link"
                        tooltipText={"More Information For Movie"}
                        className={cn(
                            "text-neutral-400 hover:text-black",
                            "dark:text-neutral-600 dark:hover:text-white"
                        )}
                    >
                        <Info/>
                    </TooltipButton>
                </MovieDetailsDialog>
            </CardContent>
        </Card>
    );
};

export default MovieIndexCard;