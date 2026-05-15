/**
 * @fileoverview Card component that displays a compact movie summary with an interactive dialog trigger.
 *
 */

import {Info} from "lucide-react";
import {ReactElement} from "react";
import {MovieDetails} from "@/domains/movies/schema/movie";
import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {
    BrowseMovieSummaryDialog
} from "@/views/client/movies/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialog.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {BrowseMovieSummary} from "@/views/client/movies/_comp/browse-movie-info";

/** Props for the BrowseMovieSummaryCard component. */
type CardProps = {
    movie: MovieDetails;
};

/**
 * Renders a movie summary card with metadata and an info icon to trigger a detailed dialog.
 */
export function BrowseMovieIndexCard({movie}: CardProps): ReactElement {
    const {slug, title, posterImage} = movie;

    return (
        <Card>
            <CardHeader className="p-0">
                <MoviePosterLink
                    className="w-full h-80 rounded-b-none"
                    slug={slug}
                    url={posterImage?.secure_url}
                    alt={`'${title}' Poster Image`}
                />
            </CardHeader>

            <CardContent className="px-5 py-5 flex justify-between items-center">
                <BrowseMovieSummary movie={movie} />

                <BrowseMovieSummaryDialog movie={movie}>
                    <IconButton variant="link" size="sm" icon={Info}/>
                </BrowseMovieSummaryDialog>
            </CardContent>
        </Card>
    );
}
