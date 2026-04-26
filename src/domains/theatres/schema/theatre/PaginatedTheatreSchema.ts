/** @fileoverview Zod schema and type definitions for paginated theatre data. */

import {generatePaginationSchema} from "@/common/utility/schemas/generatePaginationSchema.ts";
import {TheatreSchema} from "@/domains/theatres/schema/theatre/TheatreSchema.ts";
import {z} from "zod";

/** Zod schema for a paginated response containing theatre objects. */
export const PaginatedTheatreSchema = generatePaginationSchema(TheatreSchema);

/** Type representing a paginated list of theatres inferred from PaginatedTheatreSchema. */
export type PaginatedTheatres = z.infer<typeof PaginatedTheatreSchema>;