/** @fileoverview Zod schemas for coordinate form initialization and validation. */

import {z} from "zod";
import {
    preprocessEmptyToUndefined
} from "@/common/_feat/validation-preprocessors";
import {LongitudeSchema} from "@/common/_models/coordinate/LongitudeSchema.ts";
import {LatitudeSchema} from "@/common/_models/coordinate/LatitudeSchema.ts";

/** Zod schema for validating coordinate form submissions. */
export const CoordinateFormSchema = z.object({
    type: z.literal("Point").default("Point"),
    coordinates: z.tuple(
        [
            preprocessEmptyToUndefined(LongitudeSchema),
            preprocessEmptyToUndefined(LatitudeSchema),
        ],
        {
            required_error: "Required!",
            invalid_type_error: "Invalid coordinates. Must be an array of two coordinate points.",
            message: "Invalid coordinates.",
        },
    ),
});

/** Form data type inferred from the coordinate schema. */
export type CoordinateFormData = z.infer<typeof CoordinateFormSchema>;