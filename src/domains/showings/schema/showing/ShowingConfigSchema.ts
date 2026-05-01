/**
 * @fileoverview Zod schema and type definition for showing configuration flags.
 */

import {z} from "zod";
import {BooleanValueSchema} from "@/common/schema/boolean/BooleanValueSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Optional configuration flags for a showing.
 */
export const ShowingConfigSchema = z.object({
    isActive: CoercedBooleanValueSchema,
    canReserveSeats: BooleanValueSchema.optional(),
    isSpecialEvent: CoercedBooleanValueSchema.optional(),
});

/**
 * Inferred showing configuration type.
 */
export type ShowingConfig = z.infer<typeof ShowingConfigSchema>;