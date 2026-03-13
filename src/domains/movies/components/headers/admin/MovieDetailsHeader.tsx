/**
 * @file Header component for movie details view.
 * MovieDetailsHeader.tsx
 */

import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {MovieDetails} from "@/domains/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MoviePosterImage from "@/domains/movies/components/MoviePosterImage.tsx";
import formatMovieDetails from "@/domains/movies/utility/formatMovieDetails.ts";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";

/** Props for MovieDetailsHeader. */
type HeaderProps = {
    /** Source movie details. */
    movie: MovieDetails;
};

/** Renders primary header information for a movie. */
const MovieDetailsHeader = ({movie}: HeaderProps) => {
    const {
        title,
        tagline,
        posterImage,
        formatted: {genreList, yearAndDuration}
    } = formatMovieDetails(movie);

    return (
        <header className="flex space-x-3">
            <section>
                <SectionHeader srOnly={true}>Movie Poster Image</SectionHeader>
                <MoviePosterImage src={posterImage?.secure_url} alt="Poster Image"/>
            </section>

            <section className="flex-grow grid grid-cols-1 gap-1">
                <SectionHeader srOnly={true}>Movie Details</SectionHeader>

                <section className="space-y-3 flex flex-col justify-center">
                    <HeaderTitle>{title}</HeaderTitle>
                    <HeaderSubtitle>{tagline}</HeaderSubtitle>
                </section>

                <section className="space-y-1 flex flex-col justify-center">
                    <h3 className="text-xs text-neutral-400">{yearAndDuration}</h3>
                    <h3 className="text-xs text-neutral-400">{genreList}</h3>
                </section>
            </section>
        </header>
    );
};

export default MovieDetailsHeader;