/**
 * @file Core showing schema and type.
 * @filename ShowingSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {DateTimeInstanceSchema} from "@/common/schema/date-time/DateTimeInstanceSchema.ts";
import {UTCISO8601DateTimeSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ISO6391LanguageCodeEnum} from "@/common/schema/enums/ISO6391LanguageCodeEnum.ts";
import {ShowingStatusEnumSchema} from "@/domains/showings/schema/ShowingStatus.enum.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

import {ShowingConfigSchema} from "@/domains/showings/schema/showing/ShowingConfigSchema.ts";

/**
 * Core showing schema.
 *
 * Accepts both ISO date strings and `DateTime` instances for temporal fields.
 */
export const ShowingSchema = z.object({
    _id: IDStringSchema.readonly(),

    /** Accepts ISO string or DateTime instance. */
    startTime: z.union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema]),

    /** Accepts ISO string or DateTime instance. */
    endTime: z
        .union([DateTimeInstanceSchema, UTCISO8601DateTimeSchema])
        .optional()
        .nullable(),

    ticketPrice: CleanedPositiveNumberSchema,

    language: ISO6391LanguageCodeEnum,

    /** Must contain at least one language. */
    subtitleLanguages: z
        .array(ISO6391LanguageCodeEnum)
        .nonempty({message: "Must not be empty."}),

    movie: IDStringSchema,

    theatre: IDStringSchema,

    screen: IDStringSchema,

    status: ShowingStatusEnumSchema,

    config: ShowingConfigSchema,

    slug: NonEmptyStringSchema,
});

/**
 * Inferred showing type.
 */
export type Showing = z.infer<typeof ShowingSchema>;