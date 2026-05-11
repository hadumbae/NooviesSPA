/**
 * @fileoverview Card component that displays a compact movie summary with an interactive dialog trigger.
 */
import {Card, CardContent} from "@/common/components/ui/card.tsx";
import {cn} from "@/common/lib/utils.ts";
import {Info} from "lucide-react";
import BrowseMovieSummaryDialog from "@/views/client/movies/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialog.tsx";
import {HoverLinkCSS} from "@/common/constants/css/ButtonCSS.ts";
import {BrowseMovieMetaRow} from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieMetaRow.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";

/** Props for the BrowseMovieSummaryCard component. */
type CardProps = {
    movie: MovieDetails;
};

/**
 * Renders a movie summary card with metadata and an info icon to trigger a detailed dialog.
 */
export function BrowseMovieSummaryCard({movie}: CardProps): ReactElement {
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
}
