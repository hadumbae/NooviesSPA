import { MovieDetails } from "@/pages/movies/schema/movie/Movie.types.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";

/**
 * Formats key details of a movie for display purposes.
 *
 * @param movie - The movie object to format.
 * @returns An object containing formatted strings for genres, runtime, release date,
 *          languages, subtitles, and poster URL.
 */
export default function formatMovieDetails(movie: MovieDetails) {
    const { releaseDate, genres, runtime, posterImage, languages, subtitles } = movie;

    /** The URL of the movie poster, if available. */
    const posterURL = posterImage?.secure_url;

    /** The movie runtime formatted as a human-readable string. */
    const formattedRuntime = formatMovieRuntime(runtime);

    /** The release year as a string, or "Unreleased" if no date is set. */
    const formattedReleaseDate = releaseDate?.toFormat("yyyy") ?? "Unreleased";

    /** All genres of the movie joined into a single string with " | " separator. */
    const genreString = genres.map(g => g.name).join(" | ");

    /** Combined string of release year and runtime separated by " | ". */
    const releaseRuntimeString = [formattedReleaseDate, formattedRuntime].join(" | ");

    /** All spoken languages of the movie, mapped to full names or "None" if empty. */
    const languageString = languages.length > 0
        ? languages.map(c => ISO6391LanguageConstant[c]).join(", ")
        : "None";

    /** All subtitle languages of the movie, mapped to full names or "None" if empty. */
    const subtitleLanguageString = subtitles.length > 0
        ? subtitles.map(c => ISO6391LanguageConstant[c]).join(", ")
        : "None";

    return {
        /** Formatted genres string. */
        genreString,

        /** Combined release year and runtime string. */
        releaseRuntimeString,

        /** Formatted languages string. */
        languageString,

        /** Formatted subtitle languages string. */
        subtitleLanguageString,

        /** Poster image URL. */
        posterURL,

        /** Release year or "Unreleased". */
        formattedReleaseDate,

        /** Formatted runtime. */
        formattedRuntime,
    };
}
