/**
 * @fileoverview Zod schemas for validating theatre domain objects, including base models and detailed views.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {LocationSchema} from "@/common/_models/location/LocationSchema.ts";
import {SlugStringSchema} from "@/common/schema/strings/simple-strings/SlugString.ts";
import {TheatreNameSchema, TheatreSeatCapacitySchema} from "@/domains/theatres/_schema/fields";

/**
 * Validates the core theatre model including identification, naming, location, and capacity metrics.
 */
export const TheatreSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: TheatreNameSchema,
    location: LocationSchema,
    seatCapacity: TheatreSeatCapacitySchema,
    slug: SlugStringSchema.readonly(),
});

/**
 * Type representing a single theatre object, corresponding to the ITheatre interface.
 */
export type Theatre = z.infer<typeof TheatreSchema>;