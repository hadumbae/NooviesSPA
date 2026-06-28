/** @fileoverview Zod schema and type definitions for a theatre with its associated showing details. */

import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {z} from "zod";
import {generateArraySchema} from "@/common/_feat/validation-builders";
import {ShowingDetailsSchema} from "@/domains/showings/_schema/showing";

/** Zod schema for a theatre object extended with a list of detailed showings. */
export const TheatreWithRecentShowingsSchema = TheatreSchema.extend({
    showings: z.lazy(() => generateArraySchema(ShowingDetailsSchema)),
});

/** Type representing a theatre along with its recent showing details. */
export type TheatreWithRecentShowings = z.infer<typeof TheatreWithRecentShowingsSchema>;