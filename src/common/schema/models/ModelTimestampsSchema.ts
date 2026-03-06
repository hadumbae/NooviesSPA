/**
 * @file Shared schema for standard model timestamp fields.
 * @filename ModelTimestampsSchema.ts
 */

import { z } from "zod";
import { UTCISO8601DateTimeSchema } from "@/common/schema/date-time/iso-8601/UTCISO8601DateTimeSchema.ts";

/**
 * Common timestamp fields included on persisted models.
 */
export const ModelTimestampsSchema = z.object({
    createdAt: UTCISO8601DateTimeSchema,
    updatedAt: UTCISO8601DateTimeSchema,
});

/**
 * Type representation of {@link ModelTimestampsSchema}.
 */
export type ModelTimestamps = z.infer<typeof ModelTimestampsSchema>;