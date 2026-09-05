/**
 * @fileoverview Card component displaying movie metadata alongside screen showtimes for theatre views.
 */

import {ReactElement} from "react";
import {Card, CardContent, CardHeader, Separator} from "@/views/common/_comp/ui";
import {MovieMetaGenreBadges, MoviePosterImage} from "@/views/admin/movies";
import {TheatreMovieRuntimes} from "@/domains/theatres";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters";
import {TheatreScreenShowtimes} from "@/views/client/theatres/_comp/theatre-movie-runtimes/TheatreScreenShowtimes.tsx";

/** Props for the TheatreMovieRuntimesCard component. */
type GroupProps = {
    runtimes: TheatreMovieRuntimes
};

/** Displays a poster, title, duration, genres, and associated screen showtimes for a movie. */
export function TheatreMovieRuntimesCard(
    {runtimes: {movie, screens}}: GroupProps
): ReactElement {
    const {title, tagline, posterImage, runtime, genres, releaseDate} = movie;

    const movieDuration = formatMovieRuntime(runtime, true);
    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    return (
        <Card>
            <CardHeader className="p-0">
                <MoviePosterImage
                    url={posterImage?.secure_url}
                    alt={`${title} Poster`}
                    className="h-44 rounded-t-xl"
                />
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div>
                    <h3 className="subsection-title">{title}</h3>
                    <h4 className="subsection-subtitle">{releaseYear} • {movieDuration} </h4>
                </div>

                <div className="space-y-2">
                    <p className="secondary-text italic line-clamp-2">"{tagline}"</p>
                    <MovieMetaGenreBadges genres={genres}/>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4">
                    {
                        screens.map(({screen, showings}) => (
                            <TheatreScreenShowtimes
                                key={screen._id}
                                screen={screen}
                                showings={showings}
                            />
                        ))
                    }
                </div>
            </CardContent>
        </Card>
    );
}