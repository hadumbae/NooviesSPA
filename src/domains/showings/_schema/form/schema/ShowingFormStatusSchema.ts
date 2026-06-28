/**
 * @fileoverview Zod schema for validating showing status, pricing, and configuration flags.
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {ShowingStatusSchema} from "@/domains/showings/_schema/fields/ShowingStatusSchema.ts";

/**
 * Schema for showing pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: CleanedPositiveNumberSchema,
    status: ShowingStatusSchema,
    config: z.object({
        isActive: CoercedBooleanValueSchema,
        isSpecialEvent: CoercedBooleanValueSchema.optional(),
        canReserveSeats: CoercedBooleanValueSchema.optional(),
    }),
});

/**
 * Inferred type for showing status and configuration form values.
 */
export type ShowingFormStatuses = z.infer<typeof ShowingFormStatusSchema>;