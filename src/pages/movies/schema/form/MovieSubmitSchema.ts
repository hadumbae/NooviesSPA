import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {URLStringSchema} from "@/common/schema/strings/URLStringSchema.ts";
import {RefinedDateStringSchema} from "@/common/schema/dates/RefinedDateStringSchema.ts";
import {RefinedNumberSchema} from "@/common/schema/numbers/RefinedNumberSchema.ts";
import {MovieBaseSchema} from "@/pages/movies/schema/model/MovieBaseSchema.ts";
import {ISO6391CodeEnum} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import unionWithEmptyString from "@/common/utility/schemas/unionWithEmptyString.ts";

/**
 * Schema for validating movie submissions (e.g. from forms or API inputs).
 *
 * This schema extends {@link MovieBaseSchema} and refines fields for:
 * - Submission constraints (e.g., runtime must be > 0)
 * - Normalized relational fields (e.g., `genres` as ID strings)
 *
 * It is intended for data **input**, unlike {@link MovieSchema} or {@link MoviePopulatedSchema},
 * which are used for output or storage with populated entities.
 */
export const MovieSubmitSchema = MovieBaseSchema.extend({
    /**
     * Array of genre identifiers submitted by the client.
     *
     * These are expected to match IDs of known genres in the database.
     */
    genres: z.array(IDStringSchema),

    /**
     * Refined release date string expected in a valid date format.
     *
     * See {@link RefinedDateStringSchema} for validation rules.
     */
    releaseDate: RefinedDateStringSchema,

    /**
     * Refined movie runtime in minutes.
     *
     * Must be a number greater than 0.
     * See {@link RefinedNumberSchema} for base validation.
     */
    runtime: RefinedNumberSchema.refine(
        runtime => runtime && runtime > 0,
        { message: "Must be greater than 0." }
    ),

    /**
     * The ISO 639-1 language code of the movie's original language.
     */
    originalLanguage: unionWithEmptyString({schema: ISO6391CodeEnum}),

    /**
     * Optional list of spoken languages for the movie (as non-empty strings).
     */
    languages: z.array(NonEmptyStringSchema).optional(),

    /**
     * Optional list of subtitle languages available for the movie.
     */
    subtitles: z.array(NonEmptyStringSchema).optional(),

    /**
     * Optional URL to a trailer video.
     *
     * Can be `null` if no trailer is available.
     * See {@link URLStringSchema} for format validation.
     */
    trailerURL: z.union([z.null(), URLStringSchema]).optional(),
});

/**
 * Inferred TypeScript type for movie submission input.
 *
 * This type reflects the structure validated by {@link MovieSubmitSchema},
 * which expects normalized (ID-based) data and is typically used for:
 * - Admin or user-submitted forms
 * - API POST/PUT request bodies
 */
export type MovieSubmit = z.infer<typeof MovieSubmitSchema>;

