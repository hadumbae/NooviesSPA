/** @fileoverview Compact movie index card component for administrative listings. */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import TooltipButton from "@/common/components/buttons/TooltipButton.tsx";
import {MovieIndexDetailsDialog} from "@/views/admin/movies/_comp/index-list-display/MovieIndexDetailsDialog.tsx";
import {cn} from "@/common/lib/utils.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {ReactElement} from "react";
import {MovieMetaRow} from "@/views/admin/movies/_comp/movie-details";

/** Props for the MovieIndexCard component. */
type IndexCardProps = {
    movie: MovieDetails;
    className?: string;
}

/**
 * Renders a concise movie overview including a poster, title link, and metadata.
 */
export function MovieIndexCard({movie, className}: IndexCardProps): ReactElement {
    const {posterImage} = movie;

    return (
        <Card>
            <CardHeader className="p-0">
                <MoviePosterImageDialog
                    url={posterImage?.secure_url}
                    className="w-full h-72 rounded-b-none"
                />
            </CardHeader>
            <CardContent className={cn("p-5 flex items-center justify-between", className)}>
                <MovieMetaRow movie={movie}/>

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