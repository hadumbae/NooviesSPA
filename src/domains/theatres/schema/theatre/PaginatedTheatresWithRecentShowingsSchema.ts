/** @fileoverview Zod schema and type definitions for paginated theatres with recent showings. */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreWithRecentShowingsSchema} from "@/domains/theatres/schema/theatre/TheatreWithRecentShowingsSchema.ts";
import {z} from "zod";

/** Zod schema for a paginated response containing theatres and their recent showings. */
export const PaginatedTheatresWithRecentShowingsSchema = generatePaginationSchema(TheatreWithRecentShowingsSchema);

/** Type representing a paginated list of theatres with recent showings. */
export type PaginatedTheatresWithRecentShowings = z.infer<typeof PaginatedTheatresWithRecentShowingsSchema>;