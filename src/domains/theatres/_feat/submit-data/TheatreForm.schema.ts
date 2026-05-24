/** @fileoverview Zod schema and type definitions for validated theatre form data. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {LocationFormSchema} from "@/common/_models/location-form/LocationFormSchema.ts";
import {
    preprocessEmptyStringToUndefined
} from "@/common/_feat/validation-preprocessors";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/** Schema for validating and cleaning theatre form submissions. */
export const TheatreFormSchema = z.object({
    _id: IDStringSchema.readonly().optional(),
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    location: LocationFormSchema,
    seatCapacity: preprocessEmptyStringToUndefined(
        CoercedNonNegativeNumberSchema.max(2500, "Must be 2500 or less.")
    ),
});

/** Validated and cleaned theatre form data inferred from the schema. */
export type TheatreFormData = z.infer<typeof TheatreFormSchema>;