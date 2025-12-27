/**
 * @file BrowseMovieSummaryCard.tsx
 * @description
 * Card component that displays a compact movie summary with an
 * interactive dialog trigger for additional details.
 */

import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Info} from "lucide-react";
import BrowseMovieSummaryDialog from "@/pages/movies/components/client/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialog.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import BrowseMovieMetaRow
    from "@/pages/movies/components/client/browse-movies/browse-movie-summary/BrowseMovieMetaRow.tsx";

/**
 * Props for {@link BrowseMovieSummaryCard}.
 */
type CardProps = {
    /**
     * Movie data used to populate the summary card.
     */
    movie: MovieDetails;
};

/**
 * Renders a movie summary card with:
 * - A compact summary span showing key movie information
 * - An info icon that opens a dialog with extended details
 *
 * The dialog is lazily loaded and triggered via the info icon.
 *
 * @param props - Component props.
 *
 * @example
 * ```tsx
 * <BrowseMovieSummaryCard movie={movie} />
 * ```
 */
const BrowseMovieSummaryCard = ({movie}: CardProps) => {
    return (
        <Card>
            <CardContent className="px-5 py-5 flex justify-between items-center">
                <BrowseMovieMetaRow movie={movie}/>

                <BrowseMovieSummaryDialog movie={movie}>
                    <Info
                        size={20}
                        className={cn(
                            HoverLinkCSS,
                            "cursor-pointer",
                        )}
                    />
                </BrowseMovieSummaryDialog>
            </CardContent>
        </Card>
    );
};

export default BrowseMovieSummaryCard;
