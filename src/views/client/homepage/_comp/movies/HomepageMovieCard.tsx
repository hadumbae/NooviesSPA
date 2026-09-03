/**
 * @fileoverview Card component for displaying movie summary information on the homepage.
 */

import {ReactElement} from "react";
import {Link} from "react-router-dom";
import {Card, CardContent, CardHeader} from "@/views/common/_comp/ui";
import {MovieSummary} from "@/domains/movies/_schema/movie/MovieSummarySchema.ts";
import {MovieMetaGenreBadges, MoviePosterImage} from "@/views/admin/movies";
import {formatMovieRuntime} from "@/domains/movies";
import {cn} from "@/common/_feat";

type CardClassNames = {
    image?: string;
    container?: string;
    content?: string;
}

/** Props for the HomepageMovieCard component. */
type CardProps = {
    movie: MovieSummary;
    showGenreBadges?: boolean;
    classNames?: CardClassNames;
};

/** Displays a preview card for a movie including its poster, runtime, release date, and optional genre badges. */
export function HomepageMovieCard(
    {movie, showGenreBadges = false, classNames: {image, container, content} = {}}: CardProps
): ReactElement {
    const {slug, posterImage, tagline, title, genres, releaseDate, runtime} = movie;

    const formattedReleaseDate = releaseDate?.toFormat("LLL dd, yyyy") ?? "Unreleased.";
    const formattedRuntime = formatMovieRuntime(runtime, true);

    return (
        <Link to={`/browse/movies/${slug}`}>
            <Card className={cn("overflow-hidden hover:shadow-md", container)}>
                <CardHeader className="p-0">
                    <MoviePosterImage
                        url={posterImage?.secure_url}
                        className={cn("h-44 rounded-t-md", image)}
                    />
                </CardHeader>
                <CardContent className={cn("p-3 space-y-2", content)}>
                    <div>
                        <p className="subsection-header line-clamp-1">{title}</p>
                        {tagline && <p className="subsection-description line-clamp-1">{tagline}</p>}
                    </div>

                    <div className="space-y-1">
                        <p className="secondary-text text-xs">{formattedRuntime} &middot; {formattedReleaseDate} </p>
                        {showGenreBadges && <MovieMetaGenreBadges genres={genres}/>}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}