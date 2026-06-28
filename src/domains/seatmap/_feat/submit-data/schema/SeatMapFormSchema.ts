/**
 * @fileoverview Zod schemas for validating and shaping SeatMap form data.
 */

import {z} from "zod";
import {AnyValues} from "@/common/types";
import {IDStringSchema} from "@/common/schema/strings/object-id/IDStringSchema.ts";
import {CoercedPositiveNumberSchema} from "@/common/schema/numbers/positive-number/PositiveNumber.schema.ts";
import generateFormValueSchema from "@/common/utility/schemas/generateFormValueSchema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {SeatMapStatusSchema} from "@/domains/seatmap/_schema/fields";

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

export const SeatMapFormValuesSchema = generateFormValueSchema(SeatMapFormSchema);

/** Fully validated seat map form data. */
export type SeatMapFormData = z.infer<typeof SeatMapFormSchema>;

/** Form-layer seat map values supporting intermediate or partial input states. */
export type SeatMapFormValues = AnyValues<SeatMapFormData>;