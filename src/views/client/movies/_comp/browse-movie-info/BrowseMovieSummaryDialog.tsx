/**
 * @fileoverview Dialog component that displays a summary and credits for a specific movie.
 */

import {ReactElement, ReactNode, useState} from "react";
import {Search} from "lucide-react";
import {
    buttonVariants,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/views/common/_comp/ui";
import {cn} from "@/common/_feat";
import {LoggedLink} from "@/views/common/_feat/navigation/LoggedLink.tsx";
import {BrowseMoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {MovieCreditDataLazyLoader} from "@/views/admin/movie-credits/_comp/movie-credit-loaders/MovieCreditDataLazyLoader.tsx";
import {BrowseMovieSummary} from "@/views/client/movies/_comp/browse-movie-info/BrowseMovieSummary";
import {BrowseMovieSummaryCredits} from "@/views/client/movies/_comp/browse-movie-info/BrowseMovieSummaryCredits";

import {MovieDetails} from "@/domains/movies";
import {MovieCreditDetailsSchema} from "@/domains/movie-credits";


/** Props for the BrowseMovieSummaryDialog component. */
type DialogProps = {
    children: ReactNode;
    movie: MovieDetails;
};

/**
 * Displays a movie summary and lazily fetches credits when the dialog is opened.
 */
export function BrowseMovieSummaryDialog({children, movie}: DialogProps): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {_id, title, tagline, synopsis, slug, posterImage} = movie;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-3">
                <DialogHeader className="sr-only">
                    <DialogTitle>Movie Summary: {title}</DialogTitle>
                    <DialogDescription>{tagline}</DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-4">
                    <BrowseMoviePosterLink
                        className="h-32 aspect-[2/3]"
                        slug={slug}
                        url={posterImage?.secure_url}
                        alt={`'${title}' Poster Image`}
                    />

                    <BrowseMovieSummary movie={movie}/>
                </div>

                <p className="primary-text max-md:text-sm">
                    {synopsis}
                </p>

                <MovieCreditDataLazyLoader
                    schema={generateArraySchema(MovieCreditDetailsSchema)}
                    config={{populate: true, virtuals: true}}
                    queries={{movie: _id}}
                >
                    {(credits) => <BrowseMovieSummaryCredits credits={credits}/>}
                </MovieCreditDataLazyLoader>

                <LoggedLink to={`/browse/movies/${slug}`} className={cn(buttonVariants({variant: "primary"}))}>
                    <Search/> Details
                </LoggedLink>
            </DialogContent>
        </Dialog>
    );
}
