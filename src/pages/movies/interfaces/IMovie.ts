import ICloudinaryImage from "@/common/interfaces/ICloudinaryImage.ts";
import IGenre from "@/pages/genres/interfaces/IGenre.ts";
import {ObjectId} from "@/common/schema/strings/IDStringSchema.ts";
import {IMovieCredit} from "@/pages/moviecredit/interfaces/IMovieCredit.ts";
import {ISO6391Code} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";

/**
 * Represents a movie entity, including metadata, cast, crew, and related media.
 */
export default interface IMovie {
    /**
     * Unique identifier for the movie (typically a MongoDB ObjectId).
     * @readonly
     */
    readonly _id: ObjectId;

    /**
     * Public-facing title of the movie.
     */
    title: string;

    /**
     * Original title of the movie, in its native language.
     */
    originalTitle: string;

    /**
     * Optional tagline or marketing slogan for the movie.
     */
    tagline?: string;

    /**
     * Country of origin or production.
     */
    country: string;

    /**
     * Brief summary or description of the movie's plot.
     */
    synopsis: string;

    /**
     * List of genres associated with the movie.
     *
     * Can include either genre IDs or fully populated {@link IGenre} objects.
     */
    genres: (ObjectId | IGenre)[];

    /**
     * Optional list of crew members involved in the production.
     *
     * Can be either credit IDs or full {@link IMovieCredit} objects.
     */
    crew?: (ObjectId | IMovieCredit)[];

    /**
     * Optional list of cast members featured in the movie.
     *
     * Can be either credit IDs or full {@link IMovieCredit} objects.
     */
    cast?: (ObjectId | IMovieCredit)[];

    /**
     * Release date in ISO string format (YYYY-MM-DD).
     */
    releaseDate: string;

    /**
     * Runtime in minutes.
     */
    runtime: number;

    /**
     * ISO 639-1 language code of the movie's original language.
     *
     * @see {@link ISO6391Code}
     */
    originalLanguage: ISO6391Code;

    /**
     * List of available spoken language codes.
     *
     * @see {@link ISO6391Code}
     */
    languages: ISO6391Code[];

    /**
     * List of available subtitle language codes.
     *
     * @see {@link ISO6391Code}
     */
    subtitles: ISO6391Code[];

    /**
     * Optional poster image data, typically from Cloudinary.
     *
     * @see {@link ICloudinaryImage}
     */
    posterImage?: ICloudinaryImage | null;

    /**
     * Optional trailer URL (e.g. YouTube link).
     */
    trailerURL?: string | null;

    /**
     * List of showings, either as ObjectId references or full objects.
     */
    showings: (ObjectId | any)[];
}