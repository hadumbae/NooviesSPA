/**
 * @fileoverview Collection-level schemas for detailed movie credit entities.
 * Provides validation and type definitions for arrays of movie credits with
 * populated relations.
 */

import {z} from "zod";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {MovieCreditDetailsSchema} from "@/domains/moviecredit/schemas";

/**
 * Validates an array of detailed movie credit objects.
 */
export const MovieCreditDetailsArraySchema = generateArraySchema(MovieCreditDetailsSchema);

/**
 * Represents a validated array of movie credits with fully populated relations.
 */
export type MovieCreditDetailsArray = z.infer<typeof MovieCreditDetailsArraySchema>;