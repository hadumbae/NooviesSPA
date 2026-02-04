import {ShowingDetails} from "@/pages/showings/schema/showing/Showing.types.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import buildString from "@/common/utility/buildString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";
import {CloudinaryImage} from "@/common/schema/models/cloudinary-image/CloudinaryImageSchema.ts";
import {ReservationType} from "@/pages/reservation/schema/enum/ReservationTypeEnumSchema.ts";

/**
 * UI-ready formatted showing information.
 *
 * @remarks
 * Intended for presentation layers (cards, lists, detail views).
 * All fields are safe to render directly.
 */
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
};

/**
 * Formats a {@link ShowingDetails} object into UI-ready display fields.
 *
 * @remarks
 * Centralizes all human-readable formatting for showing cards, lists,
 * and detail views. Handles:
 * - Movie title + release year composition
 * - Runtime formatting
 * - Theatre-timezone–aware start time
 * - Spoken language and subtitle resolution
 * - Special vs. standard showing labeling
 *
 * This function is **pure** and performs no mutations.
 *
 * @param showing - Fully populated showing details object.
 *
 * @returns An object containing formatted strings and commonly accessed
 * identifiers for presentation components.
 */
export function formatShowingInfo(showing: ShowingDetails): FormattedShowingInfo {
    const {
        movie,
        theatre,
        screen,
        startTime,
        isSpecialEvent,
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

    const formattedType = isSpecialEvent ? "Special" : "Standard";
    const spokenLanguage = ISO6391LanguageConstant[language];
    const subtitles = subtitleLanguages.length > 0
        ? buildString(subtitleLanguages.map((l) => ISO6391LanguageConstant[l]), " • ")
        : "None";

    const reservationType = showingConfig?.canReserveSeats
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
    };
}
