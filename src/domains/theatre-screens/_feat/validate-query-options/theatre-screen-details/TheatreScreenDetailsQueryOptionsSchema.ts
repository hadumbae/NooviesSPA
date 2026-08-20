/**
 * @fileoverview Defines the validation schema and type for theatre screen details query options.
 */

import {z} from "zod";
import {CoercedNonNegativeNumberSchema} from "@/common/_schemas";
import {preprocessOptionalField} from "@/common/_feat";

/** Zod schema for validating query options when fetching theatre screen details. */
export const TheatreScreenDetailsQueryOptionsSchema = z.object({
    recentShowingsCount: preprocessOptionalField(
        CoercedNonNegativeNumberSchema.max(20, "Max 20 recent showings.")
    ).catch(10),
});

/** Inferred TypeScript type for theatre screen details query options. */
export type TheatreScreenDetailsQueryOptions = z.infer<typeof TheatreScreenDetailsQueryOptionsSchema>;