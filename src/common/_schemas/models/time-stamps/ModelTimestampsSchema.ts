/**
 * @fileoverview Zod schema defining standard creation and update timestamp fields for models.
 */

import {z} from "zod";
import {ModelTimestampDateTimeSchema} from "@/common/_schemas/models/time-stamps/ModelTimestampDateTimeSchema.ts";

/** Zod schema for model creation and update timestamps. */
export const ModelTimestampsSchema = z.object({
    createdAt: ModelTimestampDateTimeSchema,
    updatedAt: ModelTimestampDateTimeSchema,
});

/** Type definition for model timestamp fields. */
export type ModelTimestamps = z.infer<typeof ModelTimestampsSchema>;