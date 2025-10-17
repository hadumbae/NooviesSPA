import {z} from "zod";
import {DateStringSchema} from "@/common/schema/helpers/ZodDateHelpers.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {IDStringSchema} from "@/common/schema/strings/IDStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {TimeStringSchema} from "@/common/schema/datetime/TimeString.schema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391CodeEnum} from "@/common/schema/enums/languages/ISO6391CodeEnum.ts";
import {ShowingStatusEnumSchema} from "@/pages/showings/schema/ShowingStatus.enum.ts";
import {DateTime} from "luxon";

/**
 * Schema representing the **starter/default values** of a showing form.
 *
 * Each field uses `FormStarterValueSchema` to support prefilled values
 * and form initialization logic.
 */
export const ShowingFormValuesSchema = z.object({
    /** Start time (HH:mm) of the showing */
    startAtTime: FormStarterValueSchema,
    /** Start date (YYYY-MM-DD) of the showing */
    startAtDate: FormStarterValueSchema,
    /** Optional end time (HH:mm) */
    endAtTime: FormStarterValueSchema,
    /** Optional end date (YYYY-MM-DD) */
    endAtDate: FormStarterValueSchema,
    /** Ticket price */
    ticketPrice: FormStarterValueSchema,
    /** Language code (ISO 639-1) */
    language: FormStarterValueSchema,
    /** Array of subtitle languages (ISO 639-1) */
    subtitleLanguages: FormStarterValueSchema,
    /** Is this a special event showing? */
    isSpecialEvent: FormStarterValueSchema,
    /** Is this showing currently active? */
    isActive: FormStarterValueSchema,
    /** ID of the movie */
    movie: FormStarterValueSchema,
    /** ID of the theatre */
    theatre: FormStarterValueSchema,
    /** ID of the screen */
    screen: FormStarterValueSchema,
    /** Status of the showing */
    status: FormStarterValueSchema,
});

/**
 * Zod schema for **validating and submitting a movie showing form**.
 */
export const ShowingFormSchema = z.object({
    /** Start time (HH:mm) of the showing — required */
    startAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .refine((time) => time !== "", {message: "Required."}),

    /** Start date (YYYY-MM-DD) of the showing — required */
    startAtDate: z
        .union([z.literal(""), DateStringSchema])
        .refine((date) => date !== "", {message: "Required."}),

    /** Optional end time (HH:mm) */
    endAtTime: z
        .union([z.literal(""), TimeStringSchema])
        .transform((time) => (time === "" ? undefined : time))
        .optional(),

    /** Optional end date (YYYY-MM-DD) */
    endAtDate: z
        .union([z.literal(""), DateStringSchema])
        .transform((date) => (date === "" ? undefined : date))
        .optional(),

    /** Ticket price — must be positive */
    ticketPrice: CleanedPositiveNumberSchema,

    /** Language code of the showing */
    language: ISO6391CodeEnum,

    /** Subtitle languages — must be non-empty array of ISO 639-1 codes */
    subtitleLanguages: z
        .array(ISO6391CodeEnum, {message: "Must be an array of ISO 639-1 codes."})
        .nonempty({message: "Must not be empty."}),

    /** Is this a special event showing? Optional */
    isSpecialEvent: RequiredBoolean.optional(),

    /** Is this showing active? Optional */
    isActive: RequiredBoolean.optional(),

    /** Movie ID */
    movie: IDStringSchema,

    /** Theatre ID */
    theatre: IDStringSchema,

    /** Screen ID */
    screen: IDStringSchema,

    /** Status of the showing */
    status: ShowingStatusEnumSchema,
}).superRefine((values, ctx) => {
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