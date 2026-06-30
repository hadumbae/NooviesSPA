/**
 * @fileoverview Zod schema and TypeScript type for validating city names.
 */

import {NonEmptyStringSchema} from "@/common/_schemas";
import {z} from "zod";

/** Zod schema for validating a city name. */
export const CityStringSchema = NonEmptyStringSchema.max(500, {message: "Must be 500 characters or less."});

/** TypeScript type for a valid city name. */
export type CityString = z.infer<typeof CityStringSchema>;