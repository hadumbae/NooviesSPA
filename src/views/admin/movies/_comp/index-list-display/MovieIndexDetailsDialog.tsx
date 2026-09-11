/** @fileoverview Dialog component for displaying a condensed overview of movie details. */

import {ReactElement, ReactNode} from 'react';
import {
    buttonVariants,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/views/common/_comp/ui";
import {TextQuote} from "@/views/common/_comp";
import {Search} from "lucide-react";
import {cn} from "@/common/_feat";
import {LabelContent} from "@/views/common/_comp/label-content/LabelContent.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {formatMovieData} from "@/domains/movies/_feat/formatters/formatMovieData.ts";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {Link} from "react-router-dom";

/** Props for the MovieIndexDetailsDialog component. */
export type DetailsDialogProps = {
    children?: ReactNode;
    movie: MovieDetails;
};

/**
 * Renders a modal dialog containing comprehensive movie metadata, synopsis, and links.
 */
export function MovieIndexDetailsDialog({children, movie}: DetailsDialogProps): ReactElement {
    const {
        slug,
        title,
        synopsis,
        formatted: {
            genreList,
            yearAndDuration,
            posterURL,
            languageList,
            subtitleList
        },
    } = formatMovieData(movie);

    return (
        <Dialog>
            <DialogTrigger asChild>{children ?? "Open"}</DialogTrigger>

            <DialogContent className="default-container">
                <DialogHeader className="sr-only">
                    <DialogTitle>Movie: {title}</DialogTitle>
                    <DialogDescription>Movie information. Condensed.</DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2">
                    <MoviePosterImage url={posterURL} className=" w-16"/>

                    <div className="flex-grow space-y-1">
                        <h2 className="primary-text font-bold">{title}</h2>
                        <h3 className="secondary-text text-sm">{yearAndDuration}</h3>
                        <h4 className="secondary-text text-xs">{genreList}</h4>
                    </div>
                </div>

                <TextQuote>{synopsis}</TextQuote>

                <LabelContent orientation="horizontal" label="Languages">
                    <span>{languageList}</span>
                </LabelContent>

                <LabelContent orientation="horizontal" label="Subtitles">
                    <span>{subtitleList}</span>
                </LabelContent>

                <Link target="_blank" to={`/admin/movies/get/${slug}`} className={cn(
                    buttonVariants({variant: "default"}),
                    "w-full bg-primary"
                )}>
                    <Search/>
                    <span>Details</span>
                </Link>
            </DialogContent>
        </Dialog>
    );
}