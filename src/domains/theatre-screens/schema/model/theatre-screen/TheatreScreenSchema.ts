/**
 * @fileoverview Zod validation schema and type definitions for a Theatre Screen entity.
 */

import {z} from "zod";
import {IDStringSchema} from "src/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "src/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {CoercedPositiveNumberSchema} from "src/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ScreenTypeSchema} from "src/domains/theatre-screens/schema/model/ScreenTypeSchema.ts";

/**
 * Schema for validating a Theatre Screen record.
 */
export const TheatreScreenSchema = z.object({
    _id: IDStringSchema.readonly(),
    name: NonEmptyStringSchema.max(255, "Name must be 255 characters or less."),
    capacity: CoercedPositiveNumberSchema,
    screenType: ScreenTypeSchema,
    theatre: IDStringSchema,
    slug: NonEmptyStringSchema.readonly(),
});

/** Validated theatre screen entity. */
export type TheatreScreen = z.infer<typeof TheatreScreenSchema>;