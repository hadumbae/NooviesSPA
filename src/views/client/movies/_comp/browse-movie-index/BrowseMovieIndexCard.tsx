/**
 * @fileoverview Card component that displays a compact movie summary with an interactive dialog trigger.
 */

import {Info} from "lucide-react";
import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/common/components/ui";
import {IconButton} from "@/views/common/_comp";
import {BrowseMoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {BrowseMovieSummary, BrowseMovieSummaryDialog} from "@/views/client/movies/_comp/browse-movie-info";

import {MovieDetails} from "@/domains/movies";

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
                <BrowseMoviePosterLink
                    className="w-full h-80 rounded-b-none"
                    slug={slug}
                    url={posterImage?.secure_url}
                    alt={`'${title}' Poster Image`}
                />
            </CardHeader>

            <CardContent className="px-5 py-5 flex justify-between items-center">
                <BrowseMovieSummary movie={movie}/>

                <BrowseMovieSummaryDialog movie={movie}>
                    <IconButton variant="link" size="sm" icon={Info}/>
                </BrowseMovieSummaryDialog>
            </CardContent>
        </Card>
    );
}
