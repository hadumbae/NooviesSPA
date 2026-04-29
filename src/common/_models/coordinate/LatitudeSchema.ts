/** @fileoverview Zod schema and type definition for geographic latitude values. */

import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {z} from "zod";

/** Schema for validating latitude values between -90 and 90. */
export const LatitudeSchema = CoercedNumberValueSchema
    .min(-90, {message: "Latitude must be greater than or equal -90."})
    .max(90, {message: "Latitude must be less than or equal 90."});

/** A geographic latitude in decimal degrees. */
export type Latitude = z.infer<typeof LatitudeSchema>;