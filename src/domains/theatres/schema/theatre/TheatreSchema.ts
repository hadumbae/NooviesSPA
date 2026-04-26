/**
 * @fileoverview Zod schemas for validating theatre domain objects, including base models and detailed views.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {LocationSchema} from "@/common/schema/models/location/Location.schema.ts";
import {NonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";

/**
 * Validates the core theatre model including identification, naming, location, and capacity metrics.
 */
export const TheatreSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    location: LocationSchema,
    seatCapacity: NonNegativeNumberSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * Type representing a single theatre object, corresponding to the ITheatre interface.
 */
export type Theatre = z.infer<typeof TheatreSchema>;