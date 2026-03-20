/**
 * @file Utility for deriving UI-ready display strings and formatted fields from Movie models.
 * @filename formatMovieData.ts
 */

import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import {MovieDetails} from "@/domains/movies/schema/movie/MovieDetailsSchema.ts";
import {MovieWithGenres} from "@/domains/movies/schema/movie/MovieWithGenresSchema.ts";
import {MovieWithRating} from "@/domains/movies/schema/movie/MovieWithRatingSchema.ts";

/**
 * Union of Movie types that include populated genre objects.
 */
type MovieWithData = MovieDetails | MovieWithGenres | MovieWithRating;

/**
 * Result of {@link formatMovieData}, attaching a `formatted` object with display-ready strings.
 */
type FormattedReturns<TMovie extends MovieWithData> = TMovie & {
    /** Helper strings for rendering in templates without additional logic. */
    formatted: {
        /** Direct HTTPS link to the Cloudinary poster asset. */
        posterURL?: string;
        /** Human-readable duration (e.g., "1h 45m"). */
        duration: string;
        /** The 4-digit release year or a fallback string. */
        releaseYear: string;
        /** Combined year and runtime (e.g., "2024 | 2h 10m"). */
        yearAndDuration: string;
        /** Pipe-separated list of genre names. */
        genreList: string;
        /** Comma-separated list of full language names. */
        languageList: string;
        /** Comma-separated list of full subtitle language names. */
        subtitleList: string;
    }
}

/**
 * Transforms raw Movie data into an object enriched with display-friendly "formatted" fields.
 * @returns The original movie object plus the new `formatted` property.
 */
export default function formatMovieData<TMovie extends MovieWithData>(
    movie: TMovie
): FormattedReturns<TMovie> {
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