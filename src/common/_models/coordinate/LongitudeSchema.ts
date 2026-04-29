/** @fileoverview Zod schema and type definition for geographic longitude values. */

import {CoercedNumberValueSchema} from "@/common/schema/numbers/number-value/CoercedNumberValueSchema.ts";
import {z} from "zod";

/** Schema for validating longitude values between -180 and 180. */
export const LongitudeSchema = CoercedNumberValueSchema
    .min(-180, {message: "Longitude must be greater than or equal -180."})
    .max(180, {message: "Longitude must be less than or equal 180."});

/** A geographic longitude in decimal degrees. */
export type Longitude = z.infer<typeof LongitudeSchema>;