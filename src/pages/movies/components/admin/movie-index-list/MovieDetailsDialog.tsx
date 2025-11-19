import { FC, ReactNode } from 'react';
import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import TextQuote from "@/common/components/text/TextQuote.tsx";
import LoggedAnchor from "@/common/components/navigation/LoggedAnchor.tsx";
import { Search } from "lucide-react";
import { buttonVariants } from "@/common/components/ui/button.tsx";
import { cn } from "@/common/lib/utils.ts";
import LabelContent from "@/common/components/card-content/LabelContent.tsx";
import formatMovieDetails from "@/pages/movies/utility/formatMovieDetails.ts";
import {ContainerCSS} from "@/common/constants/css/ContainerCSS.ts";
import {PrimaryTextBaseCSS, SecondaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";

/**
 * Props for the `MovieDetailsDialog` component.
 */
export type DetailsDialogProps = {
    /** Optional trigger element for the dialog. Defaults to the string "Open". */
    children?: ReactNode;

    /** The movie object whose details will be displayed in the dialog. */
    movie: MovieDetails;
};

/**
 * A dialog component that displays detailed information about a movie.
 *
 * @remarks
 * - Uses `formatMovieDetails` to generate formatted strings for genres, runtime, languages, and subtitles.
 * - Displays the movie poster, title, release/runtime, genres, synopsis, languages, subtitles, and an admin details link.
 * - Includes screen-reader-only headers (`SectionHeader` and `DialogHeader`) for accessibility.
 * - The trigger element can be any ReactNode; defaults to `"Open"` if not provided.
 *
 * @param props - The props for the component, including an optional trigger element and the movie data.
 * @param props.children - Optional ReactNode to use as the dialog trigger.
 * @param props.movie - Movie details object containing information like title, poster, genres, and synopsis.
 *
 * @returns A dialog UI showing the movie's poster, title, release/runtime, genres,
 *          synopsis, languages, subtitles, and an admin details link.
 *
 * @example
 * ```tsx
 * <MovieDetailsDialog movie={someMovie}>
 *   <button>Show Details</button>
 * </MovieDetailsDialog>
 * ```
 */
const MovieDetailsDialog: FC<DetailsDialogProps> = ({ children, movie }) => {
    const { _id, title, synopsis } = movie;

    /** Formatted movie details including poster URL, genre string, release/runtime, languages, and subtitles. */
    const {
        genreString,
        releaseRuntimeString,
        posterURL,
        languageString,
        subtitleLanguageString
    } = formatMovieDetails(movie);

    return (
        <Dialog>
            {/* Dialog trigger element */}
            <DialogTrigger asChild>{children ?? "Open"}</DialogTrigger>

            <DialogContent className={ContainerCSS}>
                {/* Dialog header for screen readers */}
                <DialogHeader className="sr-only">
                    <DialogTitle>Movie: {title}</DialogTitle>
                    <DialogDescription>Movie information. Condensed.</DialogDescription>
                </DialogHeader>

                {/* Basic movie info section */}
                <section className="flex items-center space-x-2">
                    <SectionHeader srOnly={true}>Basic Movie Details</SectionHeader>

                    {/* Poster image */}
                    <section>
                        <SectionHeader srOnly={true}>Poster Image</SectionHeader>
                        <MoviePosterImage src={posterURL} disableDialog={true} />
                    </section>

                    {/* Title, release/runtime, genres */}
                    <div className="flex-grow space-y-1">
                        <h2 className={cn("font-bold", PrimaryTextBaseCSS)}>{title}</h2>
                        <h3 className={cn("text-sm", SecondaryTextBaseCSS)}>{releaseRuntimeString}</h3>
                        <h4 className={cn("text-xs", SecondaryTextBaseCSS)}>{genreString}</h4>
                    </div>
                </section>

                {/* Synopsis section */}
                <section>
                    <SectionHeader srOnly={true}>Movie Synopsis</SectionHeader>
                    <TextQuote>{synopsis}</TextQuote>
                </section>

                {/* Languages and subtitles */}
                <section>
                    <LabelContent
                        orientation="horizontal"
                        label="Languages"
                        classNames={{ content: cn("text-sm", SecondaryTextBaseCSS) }}
                    >
                        <span>{languageString}</span>
                    </LabelContent>

                    <LabelContent
                        orientation="horizontal"
                        label="Subtitles"
                        classNames={{ content: cn("text-sm", SecondaryTextBaseCSS) }}
                    >
                        <span>{subtitleLanguageString}</span>
                    </LabelContent>
                </section>

                {/* Admin details link */}
                <section>
                    <LoggedAnchor
                        target="_blank"
                        href={`/admin/movies/get/${_id}`}
                        className={cn(
                            buttonVariants({ variant: "default" }),
                            "w-full bg-primary"
                        )}
                    >
                        <Search />
                        <span>Details</span>
                    </LoggedAnchor>
                </section>
            </DialogContent>
        </Dialog>
    );
};

export default MovieDetailsDialog;
