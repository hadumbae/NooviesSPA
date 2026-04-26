/**
 * @fileoverview Zod schema and type definitions for initial seat form values.
 */

import { z } from "zod";
import { FormStarterValueSchema } from "@/common/schema/form/FormStarterValueSchema.ts";

/**
 * Zod schema defining the placeholder values used to initialize a seat form.
 */
export const SeatFormValuesSchema = z.object({
    theatre: FormStarterValueSchema,
    screen: FormStarterValueSchema,
    row: FormStarterValueSchema,
    seatNumber: FormStarterValueSchema,
    seatLabel: FormStarterValueSchema,
    seatType: FormStarterValueSchema,
    layoutType: FormStarterValueSchema,
    isAvailable: FormStarterValueSchema,
    priceMultiplier: FormStarterValueSchema,
    x: FormStarterValueSchema,
    y: FormStarterValueSchema,
});

/**
 * TypeScript type inferred from {@link SeatFormValuesSchema}.
 */
export type SeatFormValues = z.infer<typeof SeatFormValuesSchema>;