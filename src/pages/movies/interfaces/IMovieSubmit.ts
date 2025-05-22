import {ISO6391Code} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";

/**
 * Represents the structure of data required when submitting or creating a movie entity.
 */
export default interface IMovieSubmit {
    /** The localized or translated title of the movie. */
    title: string;

    /** The original title of the movie, typically in its production language. */
    originalTitle: string;

    /** An optional tagline or marketing slogan for the movie. */
    tagline?: string;

    /** The country of origin or production for the movie (as a string, typically ISO 3166-1 alpha-2 code). */
    country: string;

    /** A textual synopsis or summary of the movie’s plot. */
    synopsis: string;

    /** An array of genre IDs (ObjectIds) associated with the movie. */
    genres: ObjectId[];

    /** The release date of the movie, in ISO 8601 string format (e.g., "2024-11-20"). */
    releaseDate: string;

    /** The movie’s runtime in minutes. Can be an empty string if the runtime is not yet known. */
    runtime: number | "";

    /** The ISO 639-1 language code representing the original language of the movie. */
    originalLanguage: ISO6391Code;

    /** Optional list of spoken language codes (ISO 639-1) featured in the movie. */
    languages?: ISO6391Code[];

    /** Optional list of subtitle language codes (ISO 639-1) available for the movie. */
    subtitles?: ISO6391Code[];

    /** Optional trailer URL (e.g., YouTube or other video platform). Can be null if unavailable. */
    trailerURL?: string | null;
}