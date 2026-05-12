/**
 * @fileoverview Card component that displays a compact movie summary with an interactive dialog trigger.
 */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {Info} from "lucide-react";
import {
    BrowseMovieSummaryDialog
} from "@/views/client/movies/browse-movies/browse-movie-summary-dialog/BrowseMovieSummaryDialog.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {ReactElement} from "react";
import {MoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {
    BrowseMovieSummaryMeta
} from "@/views/client/movies/browse-movies/browse-movie-summary/BrowseMovieSummaryMeta.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";

/** Props for the BrowseMovieSummaryCard component. */
type CardProps = {
    movie: MovieDetails;
};

/**
 * Renders a movie summary card with metadata and an info icon to trigger a detailed dialog.
 */
export function BrowseMovieSummaryCard({movie}: CardProps): ReactElement {
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
                <BrowseMovieSummaryMeta
                    movie={movie}
                />

                <BrowseMovieSummaryDialog movie={movie}>
                    <IconButton variant="link" size="sm" icon={Info} />
                </BrowseMovieSummaryDialog>
            </CardContent>
        </Card>
    );
}
