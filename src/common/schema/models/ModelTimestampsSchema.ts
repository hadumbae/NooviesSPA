/**
 * @file Shared schema for standard model timestamp fields.
 * @filename ModelTimestampsSchema.ts
 */

import {z} from "zod";
import {UTCISO8601ValueSchema} from "@/common/schema/date-time/iso-8601/UTCISO8601ValueSchema.ts";

/**
 * Common timestamp fields included on persisted models.
 */
export const ModelTimestampsSchema = z.object({
    createdAt: UTCISO8601ValueSchema,
    updatedAt: UTCISO8601ValueSchema,
});

/**
 * Type representation of {@link ModelTimestampsSchema}.
 */
export type ModelTimestamps = z.infer<typeof ModelTimestampsSchema>;