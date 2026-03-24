/**
 * @file Zod validation schema and type definitions for collections of Theatre Screen entities.
 * @filename TheatreScreenArraySchema.ts
 */

import {z} from "zod";
import {TheatreScreenSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenSchema.ts";

/**
 * Zod schema for validating an array of base Theatre Screen records.
 */
export const TheatreScreenArraySchema = z.array(TheatreScreenSchema);

/**
 * TypeScript type representing a validated list of Theatre Screen objects.
 * Inferred directly from {@link TheatreScreenArraySchema}.
 */
export type TheatreScreenArray = z.infer<typeof TheatreScreenArraySchema>;