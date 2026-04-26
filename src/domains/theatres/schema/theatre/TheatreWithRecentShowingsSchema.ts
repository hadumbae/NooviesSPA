/** @fileoverview Zod schema and type definitions for a theatre with its associated showing details. */

import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {ShowingDetailsArraySchema} from "@/domains/showings/schema/showing/ShowingArraySchemas.ts";
import {z} from "zod";

/** Zod schema for a theatre object extended with a list of detailed showings. */
export const TheatreWithRecentShowingsSchema = TheatreSchema.extend({
    showings: ShowingDetailsArraySchema,
});

/** Type representing a theatre along with its recent showing details. */
export type TheatreWithRecentShowings = z.infer<typeof TheatreWithRecentShowingsSchema>;