/**
 * @fileoverview Zod schema and type definitions for grouping showings by theatre screen.
 */

import {z} from "zod";
import {TheatreScreenSummarySchema} from "@/domains/theatre-screens";
import {generateArraySchema} from "@/common/_feat";
import {TheatreShowingSchema} from "@/domains/theatres/_feat/client-view-data/theatre-info/TheatreShowingSchema.ts";

/** Schema for validating a group of showings assigned to a specific screen. */
export const TheatreScreenShowingGroupSchema = z.object({
    screen: TheatreScreenSummarySchema,
    showings: generateArraySchema(TheatreShowingSchema),
});

/** Inferred TypeScript type representing a group of showings on a specific screen. */
export type TheatreScreenShowingGroup = z.infer<typeof TheatreScreenShowingGroupSchema>;