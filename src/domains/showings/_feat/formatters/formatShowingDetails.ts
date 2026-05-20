/**
 * @fileoverview Formatter for converting showing details into display-ready strings.
 */

import formatLocationDetails from "src/common/utility/features/location/formatLocationDetails.ts";
import ISO6391LanguageConstant from "src/common/constants/languages/ISO6391LanguageConstant.ts";
import convertToTitleCase from "src/common/utility/formatters/convertToTitleCase.ts";
import {
    buildShowingDateString
} from "src/domains/showings/_feat/formatters/buildShowingDateString.ts";
import formatMovieRuntime from "src/common/utility/date-and-time/formatMovieRuntime.ts";
import {ShowingDetails} from "src/domains/showings/schema/showing/ShowingDetailsSchema.ts";

/**
 * Transforms raw showing data into a flat object of formatted strings for UI display.
 */
export function formatShowingDetails(showing: ShowingDetails) {
    const {
        screen,
        movie,
        startTime,
        endTime,
        theatre,
        language,
        subtitleLanguages,
        status,
    } = showing;

    // --- Movie details ---
    const {title: movieTitle, releaseDate, genres, runtime} = movie;
    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const runtimeString = formatMovieRuntime(runtime);
    const genreString = genres.map(({name}) => name).join(" • ");

    // --- Theatre details ---
    const {name: theatreName, location} = theatre;
    const {address, timezone} = formatLocationDetails(location);

    // --- Screen details ---
    const {name: screenName, screenType} = screen;

    // --- Showing-specific formatting ---
    const audioLanguageString = ISO6391LanguageConstant[language];
    const subtitleString = subtitleLanguages.length
        ? subtitleLanguages.join(", ").toUpperCase()
        : "None";
    const languageString = `${audioLanguageString} · SUB : ${subtitleString}`;

    const formattedStatus = convertToTitleCase(status);
    const dateString = buildShowingDateString({start: startTime, end: endTime, timezone});

    return {
        dateString,
        timezone,
        audioLanguageString,
        subtitleString,
        languageString,
        formattedStatus,

        movieTitle,
        releaseYear,
        genreString,
        runtimeString,

        theatreName,
        address,

        screenName,
        screenType,
    };
}
