import {FC} from 'react';
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Info} from "lucide-react";
import TooltipButton from "@/common/components/buttons/TooltipButton.tsx";

interface IndexCardProps {
    /**
     * The movie details to display in the card.
     */
    movie: MovieDetails;
}

/**
 * A card component displaying a movie's information with a tooltip button for more info.
 *
 * @param {IndexCardProps} props - The component props.
 * @param {MovieDetails} props.movie - The movie details to render.
 *
 * @example
 * ```tsx
 * <MovieIndexCard movie={someMovie} />
 * ```
 */
const MovieIndexCard: FC<IndexCardProps> = ({movie}) => {
    const {_id, title, originalTitle, releaseDate} = movie;
    const formattedDate = releaseDate && format(releaseDate, "yyyy");

    const tooltipText = "More Information For Movie";

    return (
        <Card>
            <CardContent className="p-4 flex items-center">
                <section className="flex-grow flex flex-col space-y-3">
                    <Link to={`/admin/movies/get/${_id}`} className="text-md font-extrabold hover:underline">
                        {title} {formattedDate && `(${formattedDate})`}
                    </Link>

                    <span>
                        {originalTitle}
                    </span>
                </section>

                <TooltipButton
                    tooltipText={tooltipText}
                    variant="link"
                    className="text-neutral-400 hover:text-black"
                >
                    <Info/>
                </TooltipButton>

            </CardContent>
        </Card>
    );
};

export default MovieIndexCard;
