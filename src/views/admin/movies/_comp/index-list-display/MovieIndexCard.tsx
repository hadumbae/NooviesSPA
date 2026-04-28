/** @fileoverview Compact movie index card component for administrative listings. */

import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import TooltipButton from "@/common/components/buttons/TooltipButton.tsx";
import {MovieIndexDetailsDialog} from "@/views/admin/movies/_comp/index-list-display/MovieIndexDetailsDialog.tsx";
import LoggedHoverLink from "@/common/components/navigation/logged-link/LoggedHoverLink.tsx";
import {cn} from "@/common/lib/utils.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";
import {formatMovieData} from "@/domains/movies/_feat/formatters";

/** Props for the MovieIndexCard component. */
type IndexCardProps = {
    movie: MovieDetails;
    className?: string;
}

/**
 * Renders a concise movie overview including a poster, title link, and metadata.
 */
export function MovieIndexCard({movie, className}: IndexCardProps): ReactElement {
    const {
        slug,
        title,
        formatted: {posterURL, genreList, yearAndDuration},
    } = formatMovieData(movie);

    return (
        <Card>
            <CardContent className="p-4 flex items-center space-x-2">
                <section>
                    <MoviePosterImageDialog
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

                <MovieIndexDetailsDialog movie={movie}>
                    <TooltipButton
                        variant="link"
                        tooltipText="More Information For Movie"
                        className={cn(
                            "text-neutral-400 hover:text-black",
                            "dark:text-neutral-600 dark:hover:text-white"
                        )}
                    >
                        <Info/>
                    </TooltipButton>
                </MovieIndexDetailsDialog>
            </CardContent>
        </Card>
    );
}