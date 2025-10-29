import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {
    CoercedNonNegativeNumberSchema,
} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {LocationFormSchema, LocationFormValueSchema} from "@/common/schema/models/location-form/LocationForm.schema.ts";
import preprocessEmptyStringToUndefined from "@/common/utility/schemas/preprocessEmptyStringToUndefined.ts";

/**
 * Schema for raw form input values for the theatre form.
 * These are initial values that may be empty or unvalidated strings/numbers
 * as received from the user interface.
 */
export const TheatreFormValuesSchema = z.object({
    /** Theatre name form value as entered by the user */
    name: FormStarterValueSchema,

    /** Theatre location form value as entered by the user */
    location: LocationFormValueSchema,

    /** Theatre seat capacity form value as entered by the user */
    seatCapacity: FormStarterValueSchema,
});

/**
 * Schema for validated and cleaned theatre form data.
 * This schema expects properly typed and sanitized data:
 * non-empty strings with max length for name/location,
 * and a cleaned non-negative number for seat capacity.
 */
export const TheatreFormSchema = z.object({
    /** Validated theatre name, max 255 characters */
    name: NonEmptyStringSchema
        .max(255, "Must be 255 characters or less."),

    /** Validated theatre location, max 255 characters */
    location: LocationFormSchema,

    /** Validated seat capacity: cleaned number >= 0, max 2500 */
    seatCapacity: preprocessEmptyStringToUndefined(CoercedNonNegativeNumberSchema.max(2500, "Must be 2500 or less.")),
});