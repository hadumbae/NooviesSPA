/**
 * @fileoverview Zod schema and type definitions for a theatre screen combined with its virtual properties.
 */

import {TheatreScreenSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenSchema.ts";
import {TheatreScreenVirtualsSchema} from "@/domains/theatre-screens/schema/model/TheatreScreenVirtualsSchema.ts";
import {z} from "zod";

/**
 * Merged schema of the base theatre screen and its calculated virtual fields.
 */
export const TheatreScreenWithVirtualsSchema = TheatreScreenSchema.merge(TheatreScreenVirtualsSchema);

/** Theatre screen entity including calculated virtual properties. */
export type TheatreScreenWithVirtuals = z.infer<typeof TheatreScreenWithVirtualsSchema>;