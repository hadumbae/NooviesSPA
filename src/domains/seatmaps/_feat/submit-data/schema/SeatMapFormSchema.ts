/**
 * @fileoverview Zod schemas for validating and shaping SeatMap form data.
 */

import {z} from "zod";
import {AnyValues} from "@/common/types";
import {IDStringSchema} from "@/common/_schemas";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {SeatMapStatusSchema} from "@/domains/seatmaps/_schema/fields";
import {CoercedPositiveNumberSchema} from "@/common/_schemas/numbers/positive-number/CoercedPositiveNumberSchema";

/**
 * Base schema for validating raw SeatMap form input including seat, showing, pricing, and status.
 */
export const SeatMapFormSchema = z.object({
    _id: IDStringSchema.optional().readonly(),
    seat: IDStringSchema,
    showing: IDStringSchema,
    basePrice: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
    priceMultiplier: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema),
    overridePrice: preprocessEmptyStringToUndefined(CoercedPositiveNumberSchema.optional()).optional(),
    status: SeatMapStatusSchema,
});

/** Fully validated seat map form data. */
export type SeatMapFormData = z.infer<typeof SeatMapFormSchema>;

/** Form-layer seat map values supporting intermediate or partial input states. */
export type SeatMapFormValues = AnyValues<SeatMapFormData>;