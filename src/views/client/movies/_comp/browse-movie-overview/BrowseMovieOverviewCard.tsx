/**
 * @fileoverview Card component displaying a compact movie overview with poster navigation and summary metadata.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui";
import {BrowseMovieSummary} from "@/views/client/movies/_comp/browse-movie-info";

import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {Link} from "react-router-dom";
import {Image} from "@/views/common/_comp";

/** Props for the BrowseMovieOverviewCard component. */
type CardProps = {
    movie: MovieDetails;
    className?: string;
};

/**
 * Renders a movie overview card with a clickable poster and summary metadata.
 */
export function BrowseMovieOverviewCard({movie}: CardProps): ReactElement {
    const {title, slug, bannerImage} = movie;

    return (
        <Link to={`/browse/movies/${slug}`}>
            <Card>
                <CardHeader className="p-0">
                    <Image
                        src={bannerImage?.secure_url}
                        className="w-full h-44 rounded-b-none"
                        alt={title}
                    />
                </CardHeader>

                <CardContent className="px-3 py-3">
                    <BrowseMovieSummary movie={movie}/>
                </CardContent>
            </Card>
        </Link>
    );
}
