/**
 * @fileoverview Zod validation schema for the Theatre Details administrative view.
 */

import { z } from "zod";
import { TheatreDetailsSchema } from "@/domains/theatres/schema/model/theatre/Theatre.schema.ts";
import generateArraySchema from "@/common/utility/schemas/generateArraySchema.ts";
import { ShowingDetailsSchema } from "@/domains/showings/schema/showing/ShowingDetailsSchema.ts";
import { generatePaginationSchema } from "@/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreScreenWithVirtualsSchema} from "@/domains/theatre-screens/schema/model";

/**
 * Validates the full data payload required for the Theatre Details dashboard.
 */
export const TheatreDetailsViewDataSchema = z.object({
    theatre: TheatreDetailsSchema,
    screens: generatePaginationSchema(TheatreScreenWithVirtualsSchema),
    showings: generateArraySchema(ShowingDetailsSchema),
});

/**
 * Type definition for the Theatre Details view data, inferred from the Zod schema.
 */
export type TheatreDetailsViewData = z.infer<typeof TheatreDetailsViewDataSchema>;