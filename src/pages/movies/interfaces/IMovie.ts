import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {ISO6391Code} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {ISO3166Alpha2Code} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";
import IShowing from "@/pages/showings/interfaces/IShowing.ts";
import {Genre} from "@/pages/genres/schema/genre/Genre.types.ts";

/**
 * Represents a movie object with optional population of genres and showings.
 *
 * @remarks
 * This interface is used in contexts where a movie's associated fields
 * (e.g., `genres`, `showings`) may be either populated objects or raw `ObjectId` references.
 */
export default interface IMovie {
    /**
     * Unique MongoDB ObjectId identifying the movie.
     * This field is read-only.
     */
    readonly _id: ObjectId;

    /**
     * Localized or display title of the movie.
     */
    title: string;

    /**
     * Original title of the movie, typically in the original language.
     */
    originalTitle: string;

    /**
     * Optional marketing tagline associated with the movie.
     */
    tagline?: string;

    /**
     * ISO 3166-1 alpha-2 country code where the movie was produced.
     */
    country: ISO3166Alpha2Code;

    /**
     * Full synopsis or summary description of the movie.
     */
    synopsis: string;

    /**
     * List of genres associated with the movie.
     *
     * @remarks
     * May contain either `ObjectId` references or fully populated `IGenre` objects.
     */
    genres: (ObjectId | Genre)[];

    /**
     * ISO 8601 formatted release date (e.g., "2025-11-15").
     */
    releaseDate: Date;

    /**
     * Runtime of the movie in minutes.
     */
    runtime: number;

    /**
     * ISO 639-1 language code representing the original spoken language.
     */
    originalLanguage: ISO6391Code;

    /**
     * List of ISO 639-1 language codes for all audio languages included in the film.
     */
    languages: ISO6391Code[];

    /**
     * List of ISO 639-1 language codes for available subtitle languages.
     */
    subtitles: ISO6391Code[];

    /**
     * Optional Cloudinary-hosted poster image metadata for the movie.
     *
     * @remarks
     * May be `null` if the movie has no poster image uploaded.
     */
    posterImage?: ICloudinaryImage | null;

    /**
     * Optional URL linking to a trailer for the movie.
     *
     * @remarks
     * May be `null` if no trailer is available.
     */
    trailerURL?: string | null;

    /**
     * List of showings scheduled for this movie.
     *
     * @remarks
     * May contain either `ObjectId` references or fully populated `IShowing` objects.
     */
    showings: (ObjectId | IShowing)[];
}