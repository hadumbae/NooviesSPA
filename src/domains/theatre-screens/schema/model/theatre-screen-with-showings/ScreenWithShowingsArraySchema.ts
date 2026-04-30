/**
 * @file Zod validation schema and type definitions for collections of Theatre Screens with their associated showings.
 * @filename ScreenWithShowingsArraySchema.ts
 */

import generateArraySchema from "src/common/utility/schemas/generateArraySchema.ts";
import {ScreenWithShowingsSchema} from "src/domains/theatre-screens/schema/model/theatre-screen-with-showings/ScreenWithShowingsSchema.ts";
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