/**
 * @file ShowingFormSchema.ts
 *
 * Zod schemas for validating the Showing management form.
 *
 * The form schema is composed of smaller, focused schemas covering:
 * - Core identifiers and theatre context
 * - Language and subtitle configuration
 * - Start/end date–time input
 * - Pricing, lifecycle status, and feature flags
 *
 * The combined {@link ShowingFormSchema} applies transformations and
 * cross-field validation to ensure a valid showing timeline.
 */

import {z} from "zod";
import {IDStringSchema}
    from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {TimeStringSchema}
    from "@/common/schema/date-time/TimeString.schema.ts";
import {CleanedPositiveNumberSchema}
    from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum}
    from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {ShowingStatusEnumSchema}
    from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {DateTime} from "luxon";
import {DateOnlyStringSchema}
    from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema}
    from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ISO3166Alpha2CountryCodeEnum}
    from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {NonEmptyStringSchema}
    from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined
    from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";
import {ShowingConfigSchema}
    from "@/pages/showings/schema/showing/Showing.schema.ts";

/**
 * Optional theatre city field.
 *
 * Empty strings are coerced to `undefined`.
 */
const citySchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Optional theatre state field.
 *
 * Empty strings are coerced to `undefined`.
 */
const stateSchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Validates core showing identifiers and theatre context.
 */
export const ShowingFormDetailSchema = z.object({
    movie: IDStringSchema,
    screen: IDStringSchema,
    theatre: IDStringSchema,
    theatreCity: citySchema,
    theatreState: stateSchema,
    theatreCountry: ISO3166Alpha2CountryCodeEnum.optional(),
});

/**
 * Validates language configuration for the showing.
 */
export const ShowingFormLanguageSchema = z.object({
    /** Primary spoken language (ISO-639-1). */
    language: preprocessEmptyStringToUndefined(ISO6391LanguageCodeEnum),

    /** Subtitle languages (non-empty ISO-639-1 list). */
    subtitleLanguages: z
        .array(
            ISO6391LanguageCodeEnum,
            {
                required_error: "Required.",
                invalid_type_error: "Must be an array of ISO 639-1 codes.",
            },
        )
        .nonempty({message: "Required."}),
});

/**
 * Validates start and optional end date–time inputs.
 *
 * - Start date and time are required.
 * - End date and time are optional but must form a valid range when both are provided.
 * - Empty strings are normalized to `undefined` for optional fields.
 */
export const ShowingFormDateTimeSchema = z.object({
    startAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .refine((time) => time !== "", {message: "Required."}),

    startAtDate: z
        .union([z.literal(""), DateOnlyStringSchema])
        .refine((date) => date !== "", {message: "Required."}),

    endAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .transform((time) => (time === "" ? undefined : time))
        .optional(),

    endAtDate: z
        .union([z.literal(""), DateOnlyStringSchema])
        .transform((date) => (date === "" ? undefined : date))
        .optional(),
});

/**
 * Validates pricing, lifecycle status, and feature flags.
 */
export const ShowingFormStatusSchema = z.object({
    /** Ticket price */
    ticketPrice: CleanedPositiveNumberSchema,

    /** Marks special screenings (e.g. premieres). */
    isSpecialEvent: CoercedBooleanValueSchema.optional(),

    /** Whether the showing is active and bookable. */
    isActive: CoercedBooleanValueSchema.optional(),

    /** Lifecycle status */
    status: ShowingStatusEnumSchema,

    /** Optional showing-level configuration */
    config: ShowingConfigSchema,
});

/**
 * Full showing form schema.
 *
 * @remarks
 * - Composes detail, language, datetime, and status schemas
 * - Removes theatre location fields from the final payload
 * - Enforces chronological validity between start and end datetime values
 */
export const ShowingFormSchema = ShowingFormDetailSchema
    .merge(ShowingFormLanguageSchema)
    .merge(ShowingFormDateTimeSchema)
    .merge(ShowingFormStatusSchema)
    .transform(({theatreCity, theatreState, theatreCountry, ...rest}) => rest)
    .superRefine((values, ctx) => {
        const {startAtTime, startAtDate, endAtTime, endAtDate} = values;

        if (endAtDate && endAtTime) {
            const start = DateTime.fromISO(`${startAtDate}T${startAtTime}`);
            const end = DateTime.fromISO(`${endAtDate}T${endAtTime}`);

            if (end < start) {
                const message = "End must not be earlier.";
                ctx.addIssue({code: "custom", path: ["endAtDate"], message});
                ctx.addIssue({code: "custom", path: ["endAtTime"], message});
                return z.NEVER;
            }
        }
    });
