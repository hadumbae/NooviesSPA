import {z} from "zod";
import {FormStarterValueSchema} from "@/common/schema/form/FormStarterValueSchema.ts";
import {CoordinateFormSchema, CoordinateFormValueSchema} from "@/common/schema/location/CoordinateForm.schema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/NonEmptyStringSchema.ts";
import {IANATimezoneSchema} from "@/common/schema/datetime/IANATimezone.schema.ts";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {ISO3166Alpha2CodeEnum} from "@/common/schema/enums/ISO3166Alpha2CodeEnum.ts";

/**
 * 💾 Schema for the *values* used to initialize or reset a location form.
 *
 * Each field is a `FormStarterValue` (e.g., `""`, `null`, or a default value)
 * to populate the form’s controlled inputs.
 *
 * @public
 */
export const LocationFormValueSchema = z.object({
    /** Initial value for the street address input. */
    street: FormStarterValueSchema,
    /** Initial value for the city input. */
    city: FormStarterValueSchema,
    /** Initial value for the state/province input. */
    state: FormStarterValueSchema,
    /** Initial value for the country input. */
    country: FormStarterValueSchema,
    /** Initial value for the postal code input. */
    postalCode: FormStarterValueSchema,
    /** Initial value for the timezone selector. */
    timezone: FormStarterValueSchema,
    /** Whether to include coordinates fields in the form. */
    includeCoordinates: RequiredBoolean,
    /** Initial value for the nested coordinates form. */
    coordinates: CoordinateFormValueSchema,
});

export const LocationFormBaseSchema = z.object({
    street: NonEmptyStringSchema.optional(),
    city: NonEmptyStringSchema,
    state: NonEmptyStringSchema.optional(),
    country: ISO3166Alpha2CodeEnum,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
});

const LocationFormIncludeCoordinatesSchema = LocationFormBaseSchema.extend({
    includeCoordinates: z.literal(true),
    coordinates: CoordinateFormSchema,
});

const LocationFormNoCoordinatesSchema = LocationFormBaseSchema.extend({
    includeCoordinates: z.literal(false),
    coordinates: z.any(),
});

export const LocationFormSchema = z.discriminatedUnion(
    "includeCoordinates",
    [LocationFormIncludeCoordinatesSchema, LocationFormNoCoordinatesSchema]
).transform(value => {
    const {includeCoordinates, coordinates, ...rest} = value;
    return includeCoordinates ? {...rest, coordinates} : rest;
});