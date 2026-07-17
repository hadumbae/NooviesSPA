/**
 * @fileoverview Utility for deriving UI-ready display strings and formatted fields from Movie models.
 */

import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {
    ISO6391LanguageLabels as ISO6391LanguageConstant
} from "@/common/_const/languages/ISO6391LanguageLabels.ts";
import {MovieDetails} from "@/domains/movies/_schema/movie/MovieDetailsSchema.ts";
import {MovieWithGenres} from "@/domains/movies/_schema/movie/MovieWithGenresSchema.ts";
import {MovieWithRating} from "@/domains/movies/_schema/movie/MovieWithRatingSchema.ts";

/** Union of Movie types that include populated genre objects. */
type MovieWithData = MovieDetails | MovieWithGenres | MovieWithRating;

/** Result of formatMovieData, attaching a formatted object with display-ready strings. */
type FormattedReturns<TMovie extends MovieWithData> = TMovie & {
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

/** Transforms raw Movie data into an object enriched with display-friendly formatted fields. */
export function formatMovieData<TMovie extends MovieWithData>(
    movie: TMovie
): FormattedReturns<TMovie> {
    const {releaseDate, genres, runtime, posterImage, languages, subtitles} = movie;

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