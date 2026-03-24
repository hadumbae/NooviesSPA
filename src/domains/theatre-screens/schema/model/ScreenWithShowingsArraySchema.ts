/**
 * @file Zod validation schema and type definitions for collections of Theatre Screens with their associated showings.
 * @filename ScreenWithShowingsArraySchema.ts
 */

import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import {ScreenWithShowingsSchema} from "@/domains/theatre-screens/schema/model/ScreenWithShowingsSchema.ts";
import {z} from "zod";

/**
 * Zod schema for validating a non-paginated list of Theatre Screens, each containing its parent Theatre and its schedule.
 */
export const ScreenWithShowingsArraySchema = generateArraySchema(ScreenWithShowingsSchema);

/**
 * TypeScript type representing a validated collection of Theatre Screens with their full schedules.
 * Inferred directly from {@link ScreenWithShowingsArraySchema}.
 */
export type ScreenWithShowingsArray = z.infer<typeof ScreenWithShowingsArraySchema>;