/**
 * @file BrowseMovieSummaryDialogContents.tsx
 * @description
 * Dialog content component that renders a concise movie overview,
 * including summary metadata, synopsis, key credits, and a link
 * to the full movie details page.
 */

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog.tsx";
import BrowseMovieSummarySpan
    from "@/pages/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieSummarySpan.tsx";
import {PrimaryTextBaseCSS} from "@/common/constants/css/TextCSS.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import BrowseMovieCreditSummaryLinkList
    from "@/pages/moviecredit/components/clients/browse-movie-clients/BrowseMovieCreditSummaryLinkList.tsx";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {Search} from "lucide-react";
import {cn} from "@/common/lib/utils.ts";
import {buttonVariants} from "@/common/components/ui/button.tsx";

/**
 * Props for {@link BrowseMovieSummaryDialogContents}.
 */
type ContentProps = {
    /**
     * Movie details used to populate summary and navigation data.
     */
    movie: MovieDetails;

    /**
     * Movie credits used to render director and actor link groups.
     */
    credits: MovieCreditDetails[];
};

/**
 * Renders the inner contents of a movie summary dialog.
 *
 * Structure:
 * - Screen-reader-only title and description for accessibility
 * - Compact movie summary header
 * - Synopsis text
 * - Linked directors and actors
 * - Call-to-action button linking to the movie details page
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieSummaryDialogContents
 *   movie={movie}
 *   credits={credits}
 * />
 * ```
 */
const BrowseMovieSummaryDialogContents = ({movie, credits}: ContentProps) => {
    const {title, tagline, synopsis, slug} = movie;

    return (
        <DialogContent>
            <DialogHeader className="sr-only">
                <DialogTitle>Movie Summary: {title}</DialogTitle>
                <DialogDescription>{tagline}</DialogDescription>
            </DialogHeader>

            {/* --- SUMMARY --- */}
            <BrowseMovieSummarySpan movie={movie}/>

            {/* --- SYNOPSIS --- */}
            <p className={cn(PrimaryTextBaseCSS, "max-md:text-sm")}>
                {synopsis}
            </p>

            {/* --- LINKS --- */}
            <BrowseMovieCreditSummaryLinkList credits={credits}/>

            {/* --- REDIRECT --- */}
            <LoggedLink
                to={`/browse/movies/${slug}`}
                className={cn(buttonVariants({variant: "primary"}))}
            >
                <Search/> Details
            </LoggedLink>
        </DialogContent>
    );
};

export default BrowseMovieSummaryDialogContents;
