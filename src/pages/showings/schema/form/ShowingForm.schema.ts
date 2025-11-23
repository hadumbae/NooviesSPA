/**
 * @file ShowingFormSchema.ts
 * @description
 * Defines Zod schemas for validating a "Showing" form in a cinema management system.
 * The schemas are modular, covering details, language, datetime, and status aspects.
 * The combined schema (`ShowingFormSchema`) supports transformations and cross-field
 * validations, e.g., ensuring that the end datetime is not earlier than the start datetime.
 *
 * Schemas included:
 * - `ShowingFormDetailSchema`: Theatre and movie identifiers and location info.
 * - `ShowingFormLanguageSchema`: Main language and subtitle languages.
 * - `ShowingFormDateTimeSchema`: Start and optional end date/time validation.
 * - `ShowingFormStatusSchema`: Ticket price, active status, special event, showing status.
 * - `ShowingFormSchema`: Merges all of the above with transformations and cross-field checks.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {TimeStringSchema} from "@/common/schema/date-time/TimeString.schema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {DateTime} from "luxon";
import {DateOnlyStringSchema} from "@/common/schema/dates/DateOnlyStringSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

const citySchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."}).optional()
).optional();

const stateSchema = preprocessEmptyStringToUndefined(
    NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."}).optional()
).optional();

/**
 * Validates basic showing details including movie, screen, theatre, and location.
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
 * Validates the main language and subtitle languages for the showing.
 */
export const ShowingFormLanguageSchema = z.object({
    language: preprocessEmptyStringToUndefined(ISO6391LanguageCodeEnum),
    subtitleLanguages: z
        .array(
            ISO6391LanguageCodeEnum,
            {required_error: "Required.", invalid_type_error: "Must be an array of ISO 639-1 codes."},
        ).nonempty({message: "Required."}),
});

/**
 * Validates start and end dates/times for the showing.
 *
 * - Start datetime is required.
 * - End datetime is optional but must be after the start datetime if provided.
 * - Empty string values are coerced to undefined for optional fields.
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
 * Validates status-related fields for the showing.
 *
 * - Ticket price must be a cleaned positive number.
 * - `isSpecialEvent` and `isActive` are optional booleans.
 * - `status` must be one of the defined showing status enums.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: CleanedPositiveNumberSchema,
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
    isActive: CoercedBooleanValueSchema.optional(),
    status: ShowingStatusEnumSchema,
});

/**
 * The full showing form schema.
 *
 * @remarks
 * Combines detail, language, datetime, and status schemas.
 * Applies a transformation to remove location fields from final output.
 * Includes cross-field validation to ensure the end datetime is not earlier than start datetime.
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
