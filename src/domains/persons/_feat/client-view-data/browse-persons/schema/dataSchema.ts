/**
 * @fileoverview Defines the paginated schema and type for the browse persons client view.
 */

import {z} from "zod";
import {generatePaginationSchema} from "@/common/_feat/validation-builders";
import {PersonSummaryInfoSchema} from "@/domains/persons/_feat/client-view-data/browse-persons/schema/personSchema.ts";

/** Zod schema for paginated person summary data. */
export const BrowsePersonsViewDataSchema = generatePaginationSchema(PersonSummaryInfoSchema);

/** Type definition for the browse persons view data. */
export type BrowsePersonsViewData = z.infer<typeof BrowsePersonsViewDataSchema>;