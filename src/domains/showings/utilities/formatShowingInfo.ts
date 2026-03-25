/**
 * @file Normalization utility for theatre showing presentation data.
 * @filename formatShowingInfo.ts
 */

import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import buildString from "@/common/utility/buildString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import { CloudinaryImage } from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import { ReservationType } from "@/domains/reservation/schema/model/fields/ReservationTypeEnumSchema.ts";
import { ShowingDetails } from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import { PopulatedShowing } from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";

/**
 * UI-ready representation of a showing.
 */
export type FormattedShowingInfo = {
    /** {@link movieTitle} without year. */
    movieTitle: string;

    /** {@link CloudinaryImage} */
    posterImage: CloudinaryImage | undefined | null;

    movieSlug: string;

    screenName: string;
    screenType: string;
    screenSlug: string;

    theatreName: string;
    theatreSlug: string;

    showingSlug: string;

    /** Human-readable language via {@link ISO6391LanguageConstant}. */
    spokenLanguage: string;

    /** Delimited subtitle labels or "None". */
    subtitles: string;

    /** Display label for the event type. */
    formattedType: "Standard" | "Special";

    /** Formatted via {@link formatMovieRuntime}. */
    formattedRunTime: string;

    /** Title suffixed with release year. */
    formattedMovieTitle: string;

    /** Year string or "Unreleased". */
    formattedReleaseDate: string;

    /** Localized time string based on theatre timezone. */
    formattedStartTime: string;

    /** {@link ReservationType} */
    reservationType: ReservationType;

    isActive: boolean;
    isSpecialEvent?: boolean;
    canReserveSeats?: boolean;
};

/**
 * Maps {@link PopulatedShowing} or {@link ShowingDetails} into {@link FormattedShowingInfo}.
 * * Centralizes timezone adjustments, language resolution, and string formatting.
 */
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

    const { title: movieTitle, posterImage, runtime, releaseDate, slug: movieSlug } = movie;
    const { slug: theatreSlug, name: theatreName, location: { timezone: theatreTimeZone } } = theatre;
    const { slug: screenSlug, name: screenName, screenType } = screen;

    const formattedReleaseDate = releaseDate ? releaseDate.toFormat("yyyy") : "Unreleased";
    const formattedMovieTitle = buildString([movieTitle, `(${formattedReleaseDate})`]);
    const formattedRunTime = formatMovieRuntime(runtime, true);

    const formattedStartTime = startTime
        .setZone(theatreTimeZone)
        .toFormat("hh:mma • dd MMM yy");

    const { isActive, isSpecialEvent, canReserveSeats } = showingConfig;

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