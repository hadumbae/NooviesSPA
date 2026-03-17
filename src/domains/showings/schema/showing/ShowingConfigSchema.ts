/**
 * @file Showing configuration schema.
 * @filename ShowingConfigSchema.ts
 */

import {z} from "zod";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";

/**
 * Optional configuration flags for a showing.
 */
export const ShowingConfigSchema = z.object({
    /** Enables seat reservations for the showing. */
    canReserveSeats: BooleanValueSchema.optional(),
});

/**
 * Inferred showing configuration type.
 */
export type ShowingConfig = z.infer<typeof ShowingConfigSchema>;