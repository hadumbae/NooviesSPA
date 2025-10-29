import {z, ZodType} from "zod";
import ISeatMapSubmit from "@/pages/seatmap/interfaces/ISeatMapSubmit.ts";
import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {CoercedBooleanValueSchema} from "@/common/schema/boolean/CoercedBooleanValueSchema.ts";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";

/**
 * Zod schema for validating `SeatMap` submission data.
 *
 * This schema defines the structure and constraints for
 * data submitted when creating or updating a seat map.
 */
export const SeatMapSubmitSchema: ZodType<ISeatMapSubmit> = z.object({
    isAvailable: CoercedBooleanValueSchema
        .optional()
        .default(true),

    isReserved: CoercedBooleanValueSchema
        .optional()
        .default(false),

    price: z
        .union([z.literal(""), CoercedNumberValueSchema])
        .refine((price) => price !== "", {message: "Required."})
        .refine((price) => price > 0, {message: "Must be 0 or greater."}),

    seat: IDStringSchema,

    showing: IDStringSchema,
});

/**
 * Represents the submission data of a `Seat Map`
 * object, inferred from `SeatMapArraySchema`.
 */
export type SeatMapSubmit = z.infer<typeof SeatMapSubmitSchema>;