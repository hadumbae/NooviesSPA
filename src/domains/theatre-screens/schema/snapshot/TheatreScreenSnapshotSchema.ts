/**
 * @fileoverview Zod schema for Theatre Screen snapshots.
 * Defines an immutable data structure used for historical records, such as bookings or audit logs.
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ScreenTypeSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Represents the finalized state of a theatre screen at the moment of a transaction.
 */
export const TheatreScreenSnapshotSchema = z.object({
    theatre: IDStringSchema,
    screenType: ScreenTypeSchema,
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),
});

/**
 * TypeScript type inferred from {@link TheatreScreenSnapshotSchema}.
 */
export type TheatreScreenSnapshot = z.infer<typeof TheatreScreenSnapshotSchema>;