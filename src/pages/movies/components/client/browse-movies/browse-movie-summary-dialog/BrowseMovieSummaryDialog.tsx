/**
 * @file BrowseMovieSummaryDialog.tsx
 * @description
 * Wrapper component that opens a dialog to display a movie summary,
 * lazily fetching and validating movie credits on demand.
 */

import {ReactNode, useState} from "react";
import {Dialog, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import useFetchMovieCredits from "@/pages/moviecredit/hooks/queries/useFetchMovieCredits.ts";
import ValidatedDataLoader from "@/common/components/query/ValidatedDataLoader.tsx";
import {MovieCreditDetailsArraySchema} from "@/pages/moviecredit/schemas/model/MovieCreditExtended.schema.ts";
import {MovieCreditDetails} from "@/pages/moviecredit/schemas/model/MovieCredit.types.ts";
import BrowseMovieSummaryDialogContents
    from "@/pages/movies/components/client/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialogContents.tsx";

/**
 * Props for {@link BrowseMovieSummaryDialog}.
 */
type DialogProps = {
    /**
     * Trigger element used to open the dialog.
     */
    children: ReactNode;

    /**
     * Movie used to populate summary content and fetch credits.
     */
    movie: MovieDetails;
};

/**
 * Provides a dialog that displays a movie summary when opened.
 *
 * Features:
 * - Controlled open state
 * - Lazy fetching of movie credits only when the dialog is open
 * - Runtime validation of fetched credit data
 * - Delegates rendering to {@link BrowseMovieSummaryDialogContents}
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieSummaryDialog movie={movie}>
 *   <Button>Quick View</Button>
 * </BrowseMovieSummaryDialog>
 * ```
 */
const BrowseMovieSummaryDialog = ({children, movie}: DialogProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {_id} = movie;

    const query = useFetchMovieCredits({
        movie: _id,
        populate: true,
        virtuals: true,
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            {isOpen && (
                <ValidatedDataLoader
                    query={query}
                    schema={MovieCreditDetailsArraySchema}
                >
                    {(credits: MovieCreditDetails[]) => (
                        <BrowseMovieSummaryDialogContents
                            movie={movie}
                            credits={credits}
                        />
                    )}
                </ValidatedDataLoader>
            )}
        </Dialog>
    );
};

export default BrowseMovieSummaryDialog;
