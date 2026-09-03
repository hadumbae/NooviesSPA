/**
 * @fileoverview Zod schema and type definitions for screen summary projections.
 */

import {z} from "zod";
import {TheatreScreenSchema} from "@/domains/theatre-screens/_schema/model/TheatreScreenSchema";

/** Schema for validating key metadata fields of a theatre screen summary. */
export const TheatreScreenSummarySchema = TheatreScreenSchema.pick({
    _id: true,
    name: true,
    screenType: true,
    slug: true,
});

/** Inferred TypeScript type representing a theatre screen summary. */
export type TheatreScreenSummary = z.infer<typeof TheatreScreenSummarySchema>;