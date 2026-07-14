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
} from "@/common/components/ui";
import {TextQuote} from "@/common/components/text/TextQuote.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {Search} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {LabelContent} from "@/common/components/card-content/LabelContent.tsx";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {formatMovieData, MovieDetails} from "@/domains/movies";

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
                    <MoviePosterImageDialog
                        url={posterURL}
                        disableDialog={true}
                        className="aspect-[2/3] w-16"
                    />

                    <div className="flex-grow space-y-1">
                        <h2 className="primary-text font-bold">{title}</h2>
                        <h3 className="secondary-text text-sm">{yearAndDuration}</h3>
                        <h4 className="secondary-text text-xs">{genreList}</h4>
                    </div>
                </div>

                <TextQuote>{synopsis}</TextQuote>

                <LabelContent
                    orientation="horizontal"
                    label="Languages"
                    classNames={{content: "secondary-text text-sm"}}
                >
                    <span>{languageList}</span>
                </LabelContent>

                <LabelContent
                    orientation="horizontal"
                    label="Subtitles"
                    classNames={{content: "secondary-text text-sm"}}
                >
                    <span>{subtitleList}</span>
                </LabelContent>

                <LoggedAnchor
                    target="_blank"
                    href={`/admin/movies/get/${slug}`}
                    className={cn(
                        buttonVariants({variant: "default"}),
                        "w-full bg-primary"
                    )}
                >
                    <Search/>
                    <span>Details</span>
                </LoggedAnchor>
            </DialogContent>
        </Dialog>
    );
}