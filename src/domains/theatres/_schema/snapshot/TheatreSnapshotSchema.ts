/** @fileoverview Zod schema and type definitions for immutable theatre snapshots. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/_schemas";
import {ISO3166Alpha2CountryCodeSchema} from "@/common/_schemas/enums/ISO3166Alpha2CountryCodeSchema.ts";
import {IANATimezoneSchema} from "@/common/_schemas/time/IANATimezoneSchema.ts";

/** Zod schema for a finalized theatre state used in historical records. */
export const TheatreSnapshotSchema = z.object({
    name: NonEmptyStringSchema.max(255, "Must be 255 characters or less."),
    street: NonEmptyStringSchema
        .max(2000, {message: "Must be 2000 characters or less."})
        .optional(),
    city: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."}),
    state: NonEmptyStringSchema
        .max(500, {message: "Must be 500 characters or less."})
        .optional(),
    country: ISO3166Alpha2CountryCodeSchema,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
});

/** Type representing a theatre snapshot inferred from TheatreSnapshotSchema. */
export type TheatreSnapshot = z.infer<typeof TheatreSnapshotSchema>;