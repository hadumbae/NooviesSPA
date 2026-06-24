/**
 * @fileoverview Defines the validation schema for a theatre's seat capacity.
 */

import {CoercedNonNegativeNumberSchema} from "@/common/schema/numbers/non-negative-number/NonNegativeNumber.schema.ts";
import {preprocessEmptyStringToUndefined} from "@/common/_feat/validation-preprocessors";
import {z} from "zod";

/** Zod schema for validating and coercing theatre seat capacity values. */
export const TheatreSeatCapacitySchema = preprocessEmptyStringToUndefined(
    CoercedNonNegativeNumberSchema.max(2500, "Max. 2500")
);

/** Type definition for a theatre's seat capacity. */
export type TheatreSeatCapacity = z.infer<typeof TheatreSeatCapacitySchema>;