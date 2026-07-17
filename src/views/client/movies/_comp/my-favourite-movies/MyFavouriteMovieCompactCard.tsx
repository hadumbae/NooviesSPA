/**
 * @fileoverview Compact movie card for displaying a user's favorite movies in a browse list.
 */

import {ReactElement} from "react";
import {Card, CardContent} from "@/common/components/ui";
import {Info} from "lucide-react";
import {buildString} from "@/common/_feat/formatters/buildString.ts";
import LoggedLink from "@/common/components/navigation/logged-link/LoggedLink.tsx";
import {MoviePosterImage} from "@/views/admin/movies/_comp/poster-image";
import {BrowseMovieSummaryDialog} from "@/views/client/movies/_comp/browse-movie-info";

import {formatMovieData, MovieDetails} from "@/domains/movies";
import {SubsectionTitle} from "@/views/common/_comp";

/** Props for the MyFavouriteMovieCompactCard component. */
type CardProps = {
    movie: MovieDetails;
}

/** Renders a compact summary card for a favorite movie including poster, metadata, and info dialog. */
export function MyFavouriteMovieCompactCard(
    {movie}: CardProps
): ReactElement {
    const {slug, title, tagline, posterImage, formatted} = formatMovieData(movie);
    const {releaseYear, duration, genreList} = formatted;

    const movieMeta = buildString([releaseYear, duration, genreList], " • ");

    return (
        <Card>
            <CardContent className="p-4 space-y-5">
                <div className="flex items-stretch space-x-4">
                    <MoviePosterImage url={posterImage?.secure_url} className="h-40"/>

                    <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-center space-x-2">
                            <section className="flex-1">
                                <LoggedLink
                                    to={`/browse/movies/${slug}`}
                                    className="hover:underline underline-offset-4"
                                >
                                    <SubsectionTitle>{title}</SubsectionTitle>
                                </LoggedLink>

                                <span className="secondary-text">{movieMeta}</span>
                            </section>

                            <BrowseMovieSummaryDialog movie={movie}>
                                <Info size={20} className="hover-button cursor-pointer"/>
                            </BrowseMovieSummaryDialog>
                        </div>

                        <span className="primary-text italic">
                            "{tagline}"
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}