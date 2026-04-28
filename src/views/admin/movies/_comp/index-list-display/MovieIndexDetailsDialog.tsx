/** @fileoverview Dialog component for displaying a condensed overview of movie details. */

import {ReactElement, ReactNode} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import {Search} from "lucide-react";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {cn} from "@/common/lib/utils.ts";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import {ContainerCSS} from "@/common/constants/css/ContainerCSS.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";

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

            <DialogContent className={ContainerCSS}>
                <DialogHeader className="sr-only">
                    <DialogTitle>Movie: {title}</DialogTitle>
                    <DialogDescription>Movie information. Condensed.</DialogDescription>
                </DialogHeader>

                <section className="flex items-center space-x-2">
                    <SectionHeader srOnly={true}>Basic Movie Details</SectionHeader>

                    <section>
                        <SectionHeader srOnly={true}>Poster Image</SectionHeader>
                        <MoviePosterImageDialog src={posterURL} disableDialog={true}/>
                    </section>

                    <div className="flex-grow space-y-1">
                        <h2 className={cn("font-bold", PrimaryTextBaseCSS)}>{title}</h2>
                        <h3 className={cn("text-sm", SecondaryTextBaseCSS)}>{yearAndDuration}</h3>
                        <h4 className={cn("text-xs", SecondaryTextBaseCSS)}>{genreList}</h4>
                    </div>
                </section>

                <section>
                    <SectionHeader srOnly={true}>Movie Synopsis</SectionHeader>
                    <TextQuote>{synopsis}</TextQuote>
                </section>

                <section>
                    <LabelContent
                        orientation="horizontal"
                        label="Languages"
                        classNames={{content: cn("text-sm", SecondaryTextBaseCSS)}}
                    >
                        <span>{languageList}</span>
                    </LabelContent>

                    <LabelContent
                        orientation="horizontal"
                        label="Subtitles"
                        classNames={{content: cn("text-sm", SecondaryTextBaseCSS)}}
                    >
                        <span>{subtitleList}</span>
                    </LabelContent>
                </section>

                <section>
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
                </section>
            </DialogContent>
        </Dialog>
    );
}