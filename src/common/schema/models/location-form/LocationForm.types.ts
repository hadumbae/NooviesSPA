import {z} from "zod";
import {LocationFormSchema, LocationFormValueSchema} from "@/common/schema/models/location-form/LocationForm.schema.ts";

/**
 * @public
 * The shape of the values used to initialize or reset the location form.
 *
 * Inferred from `LocationFormValueSchema`, it represents the raw
 * starter values (e.g. empty strings, nulls, defaults) fed into
 * controlled form inputs.
 */
export type LocationFormValues = z.infer<typeof LocationFormValueSchema>;

/**
 * @public
 * The validated data structure submitted by the location form.
 *
 * Inferred from `LocationFormSchema`, it represents the fully
 * parsed and constrained payload your form handler will receive,
 * including required address fields, timezone, and nested coordinates.
 */
export type LocationForm = z.infer<typeof LocationFormSchema>;