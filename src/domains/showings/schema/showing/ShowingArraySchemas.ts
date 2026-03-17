/**
 * @file Array schemas for showing variants.
 * @filename ShowingArraySchemas.ts
 */

import {z} from "zod";
import {ShowingSchema} from "@/domains/showings/schema/showing/ShowingSchema.ts";
import {ShowingDetailsSchema} from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import {PopulatedShowingSchema} from "@/domains/showings/schema/showing/PopulatedShowingSchema.ts";

/**
 * Array schema for core showings.
 */
export const ShowingArraySchema = z.array(ShowingSchema);

/**
 * Inferred core showings array type.
 */
export type ShowingArray = z.infer<typeof ShowingArraySchema>;

/**
 * Array schema for populated showings.
 */
export const PopulatedShowingArraySchema = z.array(PopulatedShowingSchema);

/**
 * Inferred populated showings array type.
 */
export type PopulatedShowingArray = z.infer<typeof PopulatedShowingArraySchema>;

/**
 * Array schema for detailed showings.
 */
export const ShowingDetailsArraySchema = z.array(ShowingDetailsSchema);

/**
 * Inferred detailed showings array type.
 */
export type ShowingDetailsArray = z.infer<typeof ShowingDetailsArraySchema>;