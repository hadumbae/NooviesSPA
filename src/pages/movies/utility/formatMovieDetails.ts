/**
 * @file Formats movie details for UI display.
 * formatMovieDetails.ts
 */

import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";

/** Movie details extended with derived display fields. */
type FormattedReturns = MovieDetails & {
    formatted: {
        posterURL?: string;
        duration: string;
        releaseYear: string;
        yearAndDuration: string;
        genreList: string;
        languageList: string;
        subtitleList: string;
    }
}

/** Derives formatted display fields from movie details. */
export default function formatMovieDetails(movie: MovieDetails): FormattedReturns {
    const { releaseDate, genres, runtime, posterImage, languages, subtitles } = movie;

    const posterURL = posterImage?.secure_url;
    const duration = formatMovieRuntime(runtime, true);
    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const genreList = genres.map(g => g.name).join(" | ");
    const yearAndDuration = [releaseYear, duration].join(" | ");

    const languageList = languages.length > 0
        ? languages.map(c => ISO6391LanguageConstant[c]).join(", ")
        : "None";

    const subtitleList = subtitles.length > 0
        ? subtitles.map(c => ISO6391LanguageConstant[c]).join(", ")
        : "None";

    return {
        ...movie,
        formatted: {
            posterURL,
            duration,
            releaseYear,
            yearAndDuration,
            genreList,
            languageList,
            subtitleList,
        },
    };
}