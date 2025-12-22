/**
 * @file ScreenSnapshotSchema.ts
 *
 * @description
 * Zod schema defining an immutable screen snapshot.
 *
 * Represents the finalized state of a screen at the time it is embedded into
 * higher-level snapshots (e.g. showings or reservations). Captures the screen’s
 * identity, type, and display name to ensure historical consistency even if
 * the underlying screen configuration changes later.
 *
 * Intended usage:
 * - Embedding within showing snapshots
 * - Embedding within reservation snapshots
 * - Read-only snapshot validation and typing
 */

import { z } from "zod";
import { IDStringSchema } from "@/common/schema/strings/object-id/IDStringSchema.ts";
import { ScreenTypeEnum } from "@/pages/screens/schema/ScreenType.enum.ts";
import { NonEmptyStringSchema } from "@/common/schema/strings/simple-strings/NonEmptyStringSchema.ts";

/**
 * Screen snapshot schema.
 */
export const ScreenSnapshotSchema = z.object({
    /** Identifier of the theatre this screen belongs to. */
    theatre: IDStringSchema,

    /** Classification/type of the screen (e.g. standard, IMAX, 3D). */
    screenType: ScreenTypeEnum,

    /** Human-readable screen name (max 255 characters). */
    name: NonEmptyStringSchema
        .min(1, "Required.")
        .max(255, "Name must be 255 characters or less."),
});

/**
 * TypeScript type inferred from {@link ScreenSnapshotSchema}.
 */
export type ScreenSnapshot = z.infer<typeof ScreenSnapshotSchema>;
