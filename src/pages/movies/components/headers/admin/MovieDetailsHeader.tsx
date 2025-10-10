import {FC} from 'react';
import HeaderTitle from "@/common/components/page/headers/HeaderTitle.tsx";
import {MovieDetails} from "@/pages/movies/schema/movie/Movie.types.ts";
import SectionHeader from "@/common/components/page/SectionHeader.tsx";
import MoviePosterImage from "@/pages/movies/components/MoviePosterImage.tsx";
import formatMovieDetails from "@/pages/movies/utility/formatMovieDetails.ts";
import HeaderSubtitle from "@/common/components/page/headers/HeaderSubtitle.tsx";

/**
 * Props for the `MovieDetailsHeader` component.
 */
type HeaderProps = {
    /** Movie details object containing title, tagline, poster, genres, release date, and runtime. */
    movie: MovieDetails;
};

/**
 * Displays the header section for a movie details page.
 *
 * This component renders:
 * - The movie poster image.
 * - The movie title and tagline.
 * - Release date, runtime, and genres.
 *
 * Accessibility:
 * - `SectionHeader` elements are marked `srOnly` to provide context for screen readers.
 *
 * @param props.movie - The `MovieDetails` object to display.
 */
const MovieDetailsHeader: FC<HeaderProps> = ({movie}) => {
    const {title, tagline, posterImage} = movie;

    // Format movie details into readable strings (e.g., "Action, Adventure" and "2025 • 120 min")
    const {genreString, releaseRuntimeString} = formatMovieDetails(movie);

    return (
        <header className="flex space-x-3">
            {/* Movie poster section */}
            <section>
                <SectionHeader srOnly={true}>Movie Poster Image</SectionHeader>
                <MoviePosterImage src={posterImage?.secure_url} alt="Poster Image"/>
            </section>

            {/* Movie details section */}
            <section className="flex-grow grid grid-cols-1 gap-1">
                <SectionHeader srOnly={true}>Movie Details</SectionHeader>

                {/* Title and tagline */}
                <section className="space-y-3 flex flex-col justify-center">
                    <HeaderTitle>{title}</HeaderTitle>
                    <HeaderSubtitle>{tagline}</HeaderSubtitle>
                </section>

                {/* Release date, runtime, and genres */}
                <section className="space-y-1 flex flex-col justify-center">
                    <h3 className="text-xs text-neutral-400">{releaseRuntimeString}</h3>
                    <h3 className="text-xs text-neutral-400">{genreString}</h3>
                </section>
            </section>
        </header>
    );
};

export default MovieDetailsHeader;
