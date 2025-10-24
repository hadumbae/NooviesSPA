import { ShowingDetails } from "@/pages/showings/schema/showing/Showing.types.ts";
import formatLocationDetails from "@/common/utility/features/location/formatLocationDetails.ts";
import ISO6391LanguageConstant from "@/common/constants/languages/ISO6391LanguageConstant.ts";
import convertToTitleCase from "@/common/utility/formatters/convertToTitleCase.ts";
import buildShowingDateString from "@/pages/showings/utilities/buildShowingDateString.ts";
import formatMovieRuntime from "@/common/utility/date-and-time/formatMovieRuntime.ts";

/**
 * **formatShowingDetails**
 *
 * Converts a {@link ShowingDetails} object into a set of formatted strings and metadata
 * suitable for display in admin interfaces, cards, and dialogs.
 *
 * @param showing - The showing object to format. Must include movie, theatre, screen, and timing information.
 *
 * @returns An object containing preformatted properties for display:
 * - **dateString**: Human-readable start and end time string for the showing.
 * - **timezone**: IANA timezone of the showing location.
 * - **audioLanguageString**: ISO 639-1 language of the movie.
 * - **subtitleString**: Comma-separated list of subtitle languages, uppercased.
 * - **languageString**: Concatenation of audio language and subtitle languages (`LANG · SUB : LANGS`).
 * - **formattedStatus**: Showing status in title case.
 * - **movieTitle**: Display title of the movie.
 * - **releaseYear**: Year of release or `"Unreleased"` if unknown.
 * - **genreString**: Genres concatenated with `•` separator.
 * - **runtimeString**: Formatted runtime (e.g., `"2h 15m"`).
 * - **theatreName**: Name of the theatre.
 * - **address**: Full address of the theatre.
 * - **screenName**: Name of the screen within the theatre.
 * - **screenType**: Type of the screen (e.g., IMAX, Standard).
 */
export default function formatShowingDetails(showing: ShowingDetails) {
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

    // ⚡ Movie details ⚡
    const { title: movieTitle, releaseDate, genres, runtime } = movie;
    const releaseYear = releaseDate?.toFormat("yyyy") ?? "Unreleased";
    const runtimeString = formatMovieRuntime(runtime);
    const genreString = genres.map(({ name }) => name).join(" • ");

    // ⚡ Theatre details ⚡
    const { name: theatreName, location } = theatre;
    const { address, timezone } = formatLocationDetails(location);

    // ⚡ Screen details ⚡
    const { name: screenName, screenType } = screen;

    // ⚡ Showing-specific formatting ⚡
    const audioLanguageString = ISO6391LanguageConstant[language];
    const subtitleString = subtitleLanguages.length
        ? subtitleLanguages.join(", ").toUpperCase()
        : "None";
    const languageString = `${audioLanguageString} · SUB : ${subtitleString}`;

    const formattedStatus = convertToTitleCase(status);
    const dateString = buildShowingDateString({ start: startTime, end: endTime, timezone });

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
