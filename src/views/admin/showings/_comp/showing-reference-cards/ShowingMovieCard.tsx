/**
 * @fileoverview A card component for displaying movie details within the admin showings view.
 */

import {Card, CardContent, CardHeader} from "@/common/components/ui/card.tsx";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MoviePosterImageDialog} from "@/views/admin/movies/_comp/poster-image";
import {AdminMovieMeta, MovieMetaGenreBadges} from "@/views/admin/movies/_comp/movie-details";
import {ReactElement} from "react";
import {MovieWithGenres} from "@/domains/movies/_schema/movie";

/** Props for the ShowingMovieCard component. */
type CardProps = {
    movie: MovieWithGenres | MovieDetails;
}

/**
 * Displays a summary card for a movie including its poster, metadata, and genres.
 */
export function ShowingMovieCard({movie}: CardProps): ReactElement {
    const {posterImage, genres} = movie;

    return (
        <Card>
            <CardHeader className="p-0 h-72">
                <MoviePosterImageDialog
                    url={posterImage?.secure_url}
                    className="h-full rounded-b-none aspect-[2/3]"
                />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                    <div className="flex-1 space-y-4">
                        <AdminMovieMeta movie={movie} />
                        <MovieMetaGenreBadges genres={genres} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
