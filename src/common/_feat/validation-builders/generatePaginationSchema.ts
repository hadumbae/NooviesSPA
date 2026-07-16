/**
 * @fileoverview Utility for generating Zod schemas for paginated data structures.
 */

import {z, ZodTypeAny} from "zod";

import {NonNegativeNumberSchema} from "@/common/_schemas/numbers/non-negative-number/NonNegativeNumberSchema";

/** Creates a Zod object schema containing a total count and an array of validated items. */
export const generatePaginationSchema = <TSchema extends ZodTypeAny>(schema: TSchema) =>
    z.object({
        totalItems: NonNegativeNumberSchema,
        items: z.array(z.lazy(() => schema)),
    });
