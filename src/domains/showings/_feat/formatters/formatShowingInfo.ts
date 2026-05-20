/**
 * @fileoverview Utility for normalizing and formatting theatre showing data for UI presentation.
 *
 */

import ISO6391LanguageConstant from "src/common/constants/languages/ISO6391LanguageConstant.ts";
import buildString from "src/common/utility/buildString.ts";
import formatMovieRuntime from "src/common/utility/date-and-time/formatMovieRuntime.ts";
import {CloudinaryImage} from "src/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {ReservationType} from "src/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import {ShowingDetails} from "src/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowing} from "src/domains/showings/schema/showing/PopulatedShowingSchema.ts";

/** UI-ready representation of a theatre showing. */
export type FormattedShowingInfo = {
    movieTitle: string;
    posterImage: CloudinaryImage | undefined | null;
    movieSlug: string;
    screenName: string;
    screenType: string;
    screenSlug: string;
    theatreName: string;
    theatreSlug: string;
    showingSlug: string;
    spokenLanguage: string;
    subtitles: string;
    formattedType: "Standard" | "Special";
    formattedRunTime: string;
    formattedMovieTitle: string;
    formattedReleaseDate: string;
    formattedStartTime: string;
    reservationType: ReservationType;
    isActive: boolean;
    isSpecialEvent?: boolean;
    canReserveSeats?: boolean;
};

/** Maps raw showing data into a formatted object for display. */
export function formatShowingInfo(showing: PopulatedShowing | ShowingDetails): FormattedShowingInfo {
    const {
        movie,
        theatre,
        screen,
        startTime,
        language,
        subtitleLanguages,
        slug: showingSlug,
        config: showingConfig
    } = showing;

    const {title: movieTitle, posterImage, runtime, releaseDate, slug: movieSlug} = movie;
    const {slug: theatreSlug, name: theatreName, location: {timezone: theatreTimeZone}} = theatre;
    const {slug: screenSlug, name: screenName, screenType} = screen;

    const formattedReleaseDate = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";
    const formattedMovieTitle = buildString([movieTitle, `(${formattedReleaseDate})`]);
    const formattedRunTime = formatMovieRuntime(runtime, true);

    const formattedStartTime = startTime
        .setZone(theatreTimeZone)
        .toFormat("hh:mma • dd MMM yy");

    const {isActive, isSpecialEvent, canReserveSeats} = showingConfig;

    const formattedType = isSpecialEvent ? "Special" : "Standard";

    const spokenLanguage = ISO6391LanguageConstant[language];

    const subtitles = subtitleLanguages.length > 0
        ? buildString(subtitleLanguages.map((l) => ISO6391LanguageConstant[l]), " • ")
        : "None";

    const reservationType = canReserveSeats
        ? "RESERVED_SEATS"
        : "GENERAL_ADMISSION";

    return {
        movieTitle,
        posterImage,
        screenName,
        screenType,
        theatreName,
        movieSlug,
        showingSlug,
        screenSlug,
        theatreSlug,
        formattedType,
        formattedRunTime,
        formattedMovieTitle,
        formattedReleaseDate,
        formattedStartTime,
        spokenLanguage,
        subtitles,
        reservationType,
        isActive,
        isSpecialEvent,
        canReserveSeats,
    };
}
