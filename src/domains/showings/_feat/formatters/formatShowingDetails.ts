/**
 * @fileoverview Formatter for converting showing details into display-ready strings.
 */

import {formatLocationDetails} from "@/common/_feat/formatters/formatLocationDetails.ts";
import {ISO6391LanguageLabels as ISO6391LanguageConstant} from "@/common/_const/languages/ISO6391LanguageLabels.ts";
import {convertToTitleCase} from "@/common/_feat/formatters/convertToTitleCase.ts";
import {formatMovieRuntime} from "@/domains/movies/_feat/formatters/formatMovieRuntime.ts";
import {ShowingDetails} from "@/domains/showings/_schema";
import {buildShowingDateString} from "@/domains/showings/_feat/formatters/buildShowingDateString.ts";

/**
 * Transforms raw showing data into a flat object of formatted strings for UI display.
 */
export function formatShowingDetails(showing: ShowingDetails) {
    const {
        movie,
        startTime,
        endTime,
        theatre,
        language,
        subtitleLanguages,
        status,
    } = showing;

    const {releaseDate, genres, runtime} = movie;
    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const runtimeString = formatMovieRuntime(runtime);
    const genreString = genres.map(({name}) => name).join(" • ");

    const {location} = theatre;
    const {address, timezone} = formatLocationDetails(location);

    const audioLanguageString = ISO6391LanguageConstant[language];
    const subtitleString = subtitleLanguages.length ? subtitleLanguages.join(", ").toUpperCase() : "None";
    const languageString = `${audioLanguageString} · SUB : ${subtitleString}`;

    const formattedStatus = convertToTitleCase(status);
    const dateString = buildShowingDateString({start: startTime, end: endTime, timezone});

    return {
        ...showing,
        formatted: {
            dateString,
            audioLanguageString,
            subtitleString,
            languageString,
            formattedStatus,
            releaseYear,
            genreString,
            runtimeString,
            timezone,
            address,
        }
    };
}
