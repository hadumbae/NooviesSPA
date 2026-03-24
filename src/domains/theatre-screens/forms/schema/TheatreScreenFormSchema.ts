/**
 * @file Zod validation schema and type definitions for Theatre Screen creation and update forms.
 * @filename TheatreScreenFormSchema.ts
 */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CleanedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {ScreenTypeSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Zod schema for validating screen-related form submissions.
 */
export const TheatreScreenFormSchema = z.object({
    /** The display name for the screen. Must be non-empty and under 255 characters. */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** The maximum seating capacity. Coerced to a non-negative integer. */
    capacity: CleanedNonNegativeNumberSchema,

    /** The technical format of the screen (e.g., IMAX, 3D). Validated against {@link ScreenTypeSchema}. */
    screenType: ScreenTypeSchema,

    /** The database ID of the Theatre that will house this screen. */
    theatre: IDStringSchema,
});

/**
 * TypeScript type representing the validated data from a Screen form.
 */
export type TheatreScreenForm = z.infer<typeof TheatreScreenFormSchema>;