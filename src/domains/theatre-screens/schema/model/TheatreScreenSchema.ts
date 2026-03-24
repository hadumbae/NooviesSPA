/**
 * @file Zod validation schema and type definitions for a Theatre Screen entity.
 * @filename TheatreScreenSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CoercedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ScreenTypeSchema} from "@/domains/theatre-screens/schema/model/ScreenTypeSchema.ts";

/**
 * Zod schema for validating a Theatre Screen record.
 */
export const TheatreScreenSchema = z.object({
    /** Unique database identifier (Read-only). */
    _id: IDStringSchema.readonly(),
    /** Display name for the screen (e.g., "Screen 1", "IMAX Theater"). Max 255 chars. */
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
    /** The total number of seats available in this screen. */
    capacity: CoercedPositiveNumberSchema,
    /** The technical format/category of the screen. */
    screenType: ScreenTypeSchema,
    /** Reference ID to the Theatre this screen belongs to. */
    theatre: IDStringSchema,
    /** URL-friendly identifier generated from the name (Read-only). */
    slug: NonEmptyStringSchema.readonly(),
});

/**
 * TypeScript type representing a validated Theatre Screen.
 * Inferred directly from {@link TheatreScreenSchema}.
 */
export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;