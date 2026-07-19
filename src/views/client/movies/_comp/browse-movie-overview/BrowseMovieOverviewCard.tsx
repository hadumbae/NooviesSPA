/**
 * @fileoverview Card component displaying a compact movie overview with poster navigation and summary metadata.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui";
import {BrowseMoviePosterLink} from "@/views/admin/movies/_comp/poster-image";
import {BrowseMovieSummary} from "@/views/client/movies/_comp/browse-movie-info";

import {MovieDetails} from "@/domains/movies";

/** Props for the BrowseMovieOverviewCard component. */
type CardProps = {
    movie: MovieDetails;
    className?: string;
};

/**
 * Renders a movie overview card with a clickable poster and summary metadata.
 */
export function BrowseMovieOverviewCard({movie}: CardProps): ReactElement {
    const {title, slug, posterImage} = movie;

    return (
        <Card>
            <CardHeader className="p-0">
                <BrowseMoviePosterLink
                    className="w-full h-72 rounded-b-none"
                    url={posterImage?.secure_url}
                    slug={slug}
                    alt={title}
                />
            </CardHeader>

            <CardContent className="px-3 py-3">
                <BrowseMovieSummary movie={movie} />
            </CardContent>
        </Card>
    );
}
