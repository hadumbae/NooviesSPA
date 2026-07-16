/**
 * @fileoverview Zod schema for validating showing status, pricing, and configuration flags.
 */

import {z} from "zod";
import {CoercedBooleanValueSchema} from "@/common/_schemas/boolean/CoercedBooleanValueSchema.ts";
import {ShowingStatusSchema} from "@/domains/showings/_schema/fields/ShowingStatusSchema.ts";
import {preprocessToNumber} from "@/common/_feat/validation-preprocessors";

import {PositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/PositiveNumberSchema";

/**
 * Schema for showing pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: preprocessToNumber(PositiveNumberSchema),
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