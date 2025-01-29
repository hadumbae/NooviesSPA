import {z, ZodType} from "zod";
import {RequiredBoolean} from "@/common/schema/helpers/ZodBooleanHelpers.ts";
import {RequiredNumber} from "@/common/schema/helpers/ZodNumberHelpers.ts";
import {RefinedIDString} from "@/common/schema/helpers/ZodStringHelpers.ts";
import ISeatMapSubmit from "@/pages/seatmap/interfaces/ISeatMapSubmit.ts";

/**
 * Zod schema for validating `SeatMap` submission data.
 *
 * This schema defines the structure and constraints for
 * data submitted when creating or updating a seat map.
 */
export const SeatMapSubmitSchema: ZodType<ISeatMapSubmit> = z.object({
    isAvailable: RequiredBoolean
        .optional()
        .default(true),

    isReserved: RequiredBoolean
        .optional()
        .default(false),

    price: z
        .union([z.literal(""), RequiredNumber])
        .refine((price) => price !== "", {message: "Required."})
        .refine((price) => price > 0, {message: "Must be 0 or greater."}),

    seat: RefinedIDString,

    showing: RefinedIDString,
});

/**
 * Represents the submission data of a `Seat Map`
 * object, inferred from `SeatMapArraySchema`.
 */
export type SeatMapSubmit = z.infer<typeof SeatMapSubmitSchema>;