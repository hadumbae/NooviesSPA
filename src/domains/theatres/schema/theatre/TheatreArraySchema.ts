/** @fileoverview Zod schema and type definitions for a collection of theatre objects. */

import {z} from "zod";
import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";

/** Zod array schema for validating multiple theatre objects. */
export const TheatreArraySchema = z.array(TheatreSchema);

/** Type representing a list of theatres inferred from TheatreArraySchema. */
export type TheatreArray = z.infer<typeof TheatreArraySchema>;