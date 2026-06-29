/**
 * @fileoverview Zod schema and TypeScript type for a populated theatre screen.
 */

import {TheatreScreenSchema} from "./TheatreScreenSchema.ts";
import {z} from "zod";
import {TheatreSchema} from "@/domains/theatres/_schema/theatre";


/** Zod schema for a Theatre Screen that includes the full Theatre object instead of just an ID. */
export const PopulatedTheatreScreenSchema = TheatreScreenSchema.extend({
    theatre: z.lazy(() => TheatreSchema),
});

/** TypeScript type representing a validated Theatre Screen with its parent theatre fully populated. */
export type PopulatedTheatreScreen = z.infer<typeof PopulatedTheatreScreenSchema>;