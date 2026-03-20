/**
 * @file BrowseMovieSummaryDialog.tsx
 * @description
 * Wrapper component that opens a dialog to display a movie summary,
 * lazily fetching and validating movie credits on demand.
 */

import {ReactNode, useState} from "react";
import {Dialog, DialogTrigger} from "@/common/components/ui/dialog.tsx";
import {MovieCreditDetailsArraySchema} from "@/domains/moviecredit/schemas/model/movie-credit-related-schema/MovieCreditRelated.schema.ts";
import BrowseMovieSummaryDialogContents
    from "@/domains/movies/components/client/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialogContents.tsx";
import MovieCreditDataLoader
    from "@/domains/moviecredit/components/movie-credit-paginated-list/MovieCreditDataLoader.tsx";
import {
    MovieCreditDetails
} from "@/domains/moviecredit/schemas/model/movie-credit-details-schema/MovieCreditDetails.types.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";

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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            {isOpen && (
                <MovieCreditDataLoader
                    schema={MovieCreditDetailsArraySchema}
                    populate={true}
                    virtuals={true}
                    movie={_id}
                >
                    {(credits: MovieCreditDetails[]) => (
                        <BrowseMovieSummaryDialogContents
                            movie={movie}
                            credits={credits}
                        />
                    )}
                </MovieCreditDataLoader>
            )}
        </Dialog>
    );
};

export default BrowseMovieSummaryDialog;
