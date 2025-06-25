import {z, ZodType} from "zod";
import ITheatreSubmit from "@/pages/theatres/interfaces/ITheatreSubmit.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {CleanedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Schema for raw form input values for the theatre form.
 * These are initial values that may be empty or unvalidated strings/numbers
 * as received from the user interface.
 */
export const TheatreFormValuesSchema = z.object({
    /** Theatre name form value as entered by the user */
    name: FormStarterValueSchema,

    /** Theatre location form value as entered by the user */
    location: FormStarterValueSchema,

    /** Theatre seat capacity form value as entered by the user */
    seatCapacity: FormStarterValueSchema,
});

/**
 * Schema for validated and cleaned theatre form data.
 * This schema expects properly typed and sanitized data:
 * non-empty strings with max length for name/location,
 * and a cleaned non-negative number for seat capacity.
 */
export const TheatreFormRawSchema = z.object({
    /** Validated theatre name, max 255 characters */
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Validated theatre location, max 255 characters */
    location: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),

    /** Validated non-negative seat capacity number */
    seatCapacity: CleanedNonNegativeNumberSchema,
});

/**
 * Zod schema representing a fully validated theatre submit object
 * conforming to the `ITheatreSubmit` interface.
 */
export const TheatreFormSchema = TheatreFormRawSchema as ZodType<ITheatreSubmit>;