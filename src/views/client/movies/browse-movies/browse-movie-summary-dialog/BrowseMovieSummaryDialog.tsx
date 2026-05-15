/**
 * @fileoverview Dialog component that displays a summary and credits for a specific movie.
 */

import {ReactElement, ReactNode, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/common/components/ui/dialog.tsx";
import {
    MovieCreditDataLazyLoader
} from "../../../../admin/movie-credits/_comp/movie-credit-loaders/MovieCreditDataLazyLoader.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieCreditDetailsArraySchema} from "@/domains/moviecredit/schemas/model/MovieCreditDetailsArraySchema.ts";
import {cn} from "@/common/lib/utils.ts";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import BrowseMovieCreditSummaryLinkList
    from "@/views/admin/movie-credits/_comp/clients/browse-movie-clients/BrowseMovieCreditSummaryLinkList.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {buttonVariants} from "@/common/components/ui/button.tsx";
import {Search} from "lucide-react";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {BrowseMovieSummary} from "@/views/client/movies/_comp/browse-movie-info";

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
                    <MoviePosterLink
                        className="h-32 aspect-[2/3]"
                        slug={slug}
                        url={posterImage?.secure_url}
                        alt={`'${title}' Poster Image`}
                    />

                    <BrowseMovieSummary movie={movie} />
                </div>

                <p className={cn(PrimaryTextBaseCSS, "max-md:text-sm")}>
                    {synopsis}
                </p>

                <MovieCreditDataLazyLoader
                    schema={MovieCreditDetailsArraySchema}
                    config={{populate: true, virtuals: true}}
                    queries={{movie: _id}}
                >
                    {(credits) => <BrowseMovieCreditSummaryLinkList credits={credits}/>}
                </MovieCreditDataLazyLoader>

                <LoggedLink
                    to={`/browse/movies/${slug}`}
                    className={cn(buttonVariants({variant: "primary"}))}
                >
                    <Search/> Details
                </LoggedLink>
            </DialogContent>
        </Dialog>
    );
}
