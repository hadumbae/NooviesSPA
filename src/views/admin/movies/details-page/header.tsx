/**
 * @fileoverview Defines the header for the Movie Details view.
 * Provides a composite display of the movie poster, primary titles,
 * and formatted metadata such as runtime, release year, and genres.
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import MoviePosterImage from "@/domains/movies/components/MoviePosterImage.tsx";
import formatMovieData from "@/domains/movies/utility/formatMovieData.ts";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import MovieDetailsOptions from "@/domains/movies/components/admin/movie-details/MovieDetailsOptions.tsx";
import IconButton from "@/common/components/buttons/IconButton.tsx";
import {Ellipsis} from "lucide-react";
import {MovieDetailsBreadcrumb} from "@/views/admin/movies/details-page/breadcrumbs.tsx";

type HeaderProps = {
    movie: MovieDetails
}

/**
 * Renders the primary administrative header for a movie profile.
 */
export function MovieDetailsHeader({movie}: HeaderProps) {
    const {
        title,
        tagline,
        posterImage,
        slug,
        formatted: {genreList, yearAndDuration}
    } = formatMovieData(movie);

    return (
        <header className="flex flex-col">
            <div className="flex justify-between items-center">
                <MovieDetailsBreadcrumb />

                <MovieDetailsOptions slug={slug} hasPoster={!!posterImage}>
                    <IconButton icon={Ellipsis} />
                </MovieDetailsOptions>
            </div>

            <div className="flex space-x-3">
                <div>
                    <MoviePosterImage
                        src={posterImage?.secure_url}
                        alt="Poster Image"
                    />
                </div>

                <div className="flex-grow grid grid-cols-1 gap-1">
                    <div className="space-y-3 flex flex-col justify-center">
                        <HeaderTitle>{title}</HeaderTitle>
                        <HeaderSubtitle>{tagline}</HeaderSubtitle>
                    </div>

                    <div className="space-y-1 flex flex-col justify-center">
                        <h3 className="text-xs font-medium secondary-text">{yearAndDuration}</h3>
                        <h3 className="text-xs font-medium secondary-text">{genreList}</h3>
                    </div>
                </div>
            </div>
        </header>
    );
}