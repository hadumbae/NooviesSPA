/**
 * @file Zod schema defining an immutable screen snapshot for historical records.
 * @filename ScreenSnapshotSchema.ts
 */

import {z} from "zod";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {NonEmptyStringSchema} from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";
import {ScreenTypeSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Represents the finalized state of a theatre screen at the moment of a transaction.
 */
export const ScreenSnapshotSchema = z.object({
    /** The BSON ID of the theatre where this screen is located. */
    theatre: IDStringSchema,

    /** The technical specification or branding of the screen at the time of booking. */
    screenType: ScreenTypeSchema,

    /** The display name of the screen; capped at 255 characters. */
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),
});

/**
 * TypeScript type inferred from {@link ScreenSnapshotSchema}.
 */
export type ScreenSnapshot = z.infer<typeof ScreenSnapshotSchema>;