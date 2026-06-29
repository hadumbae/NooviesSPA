/** @fileoverview Zod schema and type definitions for immutable theatre snapshots. */

import {z} from "zod";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ISO3166Alpha2CountryCodeEnum} from "@/common/schema/enums/ISO3166Alpha2CountryCodeEnum.ts";
import {IANATimezoneSchema} from "@/common/schema/date-time/IANATimezone.schema.ts";

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
    country: ISO3166Alpha2CountryCodeEnum,
    postalCode: NonEmptyStringSchema.optional(),
    timezone: IANATimezoneSchema,
});

/** Type representing a theatre snapshot inferred from TheatreSnapshotSchema. */
export type TheatreSnapshot = z.infer<typeof TheatreSnapshotSchema>;