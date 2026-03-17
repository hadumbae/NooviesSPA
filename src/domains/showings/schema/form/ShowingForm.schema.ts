/**
 * @file Zod schemas for the showing management form.
 * @filename ShowingFormSchema.ts
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
    from "@/domains/showings/schema/ShowingStatus.enum.ts";
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

/**
 * Optional string field that normalizes empty input to `undefined`.
 */
const citySchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Optional string field that normalizes empty input to `undefined`.
 */
const stateSchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional()
).optional();

/**
 * Core identifiers and theatre context.
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
 * Language configuration.
 */
export const ShowingFormLanguageSchema = z.object({
    language: preprocessEmptyStringToUndefined(ISO6391LanguageCodeEnum),
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum, {
            required_error: "Required.",
            invalid_type_error: "Must be an array of ISO 639-1 codes.",
        })
        .nonempty({message: "Required."}),
});

/**
 * Date/time inputs with normalization for optional end values.
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
 * Pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: CleanedPositiveNumberSchema,
    status: ShowingStatusEnumSchema,

    /** Nested configuration mapped directly to showing config. */
    config: z.object({
        isActive: CoercedBooleanValueSchema,
        isSpecialEvent: CoercedBooleanValueSchema.optional(),
        canReserveSeats: CoercedBooleanValueSchema.optional(),
    }),
});

/**
 * Composed showing form schema.
 *
 * - Removes theatre location fields from the output
 * - Ensures end datetime is not earlier than start
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