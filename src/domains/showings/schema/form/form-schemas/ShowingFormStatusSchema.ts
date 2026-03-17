/**
 * @file Schema for showing status and configuration.
 * @filename ShowingFormStatusSchema.ts
 */

import {z} from "zod";
import {CleanedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import {ShowingStatusEnumSchema} from "@/domains/showings/schema/ShowingStatus.enum.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";

/**
 * Pricing, lifecycle state, and configuration flags.
 */
export const ShowingFormStatusSchema = z.object({
    ticketPrice: CleanedPositiveNumberSchema,
    status: ShowingStatusEnumSchema,

    /** Mapped directly to showing configuration. */
    config: z.object({
        /** Coerced to boolean. */
        isActive: CoercedBooleanValueSchema,

        /** Coerced to boolean. */
        isSpecialEvent: CoercedBooleanValueSchema.optional(),

        /** Coerced to boolean. */
        canReserveSeats: CoercedBooleanValueSchema.optional(),
    }),
});

/**
 * Inferred type for showing status form values.
 */
export type ShowingFormStatuses = z.infer<typeof ShowingFormStatusSchema>;